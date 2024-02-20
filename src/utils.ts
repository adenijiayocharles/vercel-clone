const MAX_LEN = 5;

export function generate() {
    let answer = "";
    const subset = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < MAX_LEN; i++)
    {
        answer += subset[Math.floor(Math.random() * subset.length)];
    }

    return answer;
}