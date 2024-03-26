type DevLog = {
    date: string,
    version: string,
    text: string // html works
}
export const devLog: DevLog[] = [
    {
        date: "2024-03-26",
        version: "v0.4",
        text: `
            <h4>Changes</h4>
            - Added some QoL functions <br>
            - Added the preview panel <br>
            - Image related should work now <br>
            <br>
            <h4>Still not working</h4>
            - Load theme <br>
            - Any Sound related <br>
            - Any Font related <br>
        `
    },
    {
        date: "2024-03-25",
        version: "v0.2",
        text: `
            What is not working now: <br>
            - Load theme <br>
            - any images related <br>
            - any sound related <br>
        `
    },
    {
        date: "2024-03-25",
        version: "v0.1",
        text: `(｡・ω・｡)`
    }
]