export function wpm(words, time) {
    // Assuming time is in seconds, you want to convert it to minutes
    let wpm = Math.floor((words / time) * 60);
    return parseInt(wpm,10);
}
export function accuracy(correct,total)
{
    const acc=(correct/total)*100;
    return acc;
}