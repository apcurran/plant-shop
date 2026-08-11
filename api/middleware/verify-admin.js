import jwt from "jsonwebtoken";

export function verifyAdmin(req, res, next) {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
        return res.status(401).json({ error: "Access denied." });
    }

    const parts = authHeader.split(" ");

    if (
        parts.length !== 2 ||
        parts[0].toLowerCase() !== "bearer" ||
        !parts[1]
    ) {
        return res
            .status(401)
            .json({ error: "Malformed Authorization header." });
    }

    const token = parts[1];

    jwt.verify(
        token,
        process.env.TOKEN_SECRET,
        { algorithms: ["HS256"] },
        (err, user) => {
            if (err) {
                console.error(err);

                return res
                    .status(403)
                    .json({ error: "Invalid or expired token." });
            }

            if (!user.isAdmin) {
                return res.status(403).json({ error: "Unauthorized access." });
            }

            // Authentication and authorization passed
            req.user = user;
            next();
        },
    );
}
