const dateFormatter = new Intl.DateTimeFormat("en-US", { dateStyle: "long" });

function formatDate(myDate) {
    const myDateObj = new Date(myDate);

    return dateFormatter.format(myDateObj);
}

export { formatDate };