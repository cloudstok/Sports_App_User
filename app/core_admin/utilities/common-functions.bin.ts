
export class commonFunctions {
    constructor(){}

    async convertDateFormat(date){
        const convertedDate = new Date(date).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'})
        console.log(typeof convertedDate)
        return convertedDate
    }
}