export const showScore = (index, listOfShowScores) => {
    const newItems = [...listOfShowScores];

    newItems[index] = 1;

    return newItems;
}