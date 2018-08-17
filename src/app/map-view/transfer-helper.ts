export class TransferHelper {
  flatIds: string[]; //to have linear time access
  constructor(private idPairs: Array<[string, string]>) {
    this.flatIds = idPairs.reduce((acc, cur) => {
      acc.push(cur[0], cur[1]);
      return acc;
    }, []);
  }
  hasTransfer(id: string) {
    return this.flatIds.includes(id);
  }
  getTransferID(id: string) {
    for (let pair of this.idPairs) {
      let index = pair.indexOf(id);
      if (index !== -1) {
        return index === 0 ? pair[1] : pair[0];
      }
    }
  }
}
