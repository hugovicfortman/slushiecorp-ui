export class _Array {
    static replace(array: any[], player: any, substitute: any): any[]
    {
        const index = array.findIndex(p => p === player);
        if(index != -1)
        {
            array.splice(index, 1, substitute);
        }
        return array;
    }
}