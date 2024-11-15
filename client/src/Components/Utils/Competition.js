export const compClick = (match) => {
    if (match.competition !== "BLANK") {
        let query = "";
        if (match.competition === "League Cup") { query = `${match.competition} draw` }
        else if (match.competition === "LOI") { query = "Irish Premier Division standings"}
        else { query = `${match.competition} standings` }


        window.open(`https://www.google.com/search?q=${query}`, "Popup", "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=720, height=720, top=30");
    }
}