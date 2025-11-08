export default class CarImages {
    constructor(public carId: string, public carImage: ArrayBuffer, public imageType: string) {
        return { carId: carId, carImage: carImage, imageType: imageType }
    }
}