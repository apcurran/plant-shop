function formatDate(myDate) {
    const myDateObj = new Date(myDate);

    return new Intl
                .DateTimeFormat("en-US", { dateStyle: "long" })
                .format(myDateObj);
}

export { formatDate };