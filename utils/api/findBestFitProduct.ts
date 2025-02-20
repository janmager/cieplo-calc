import { Product } from "@prisma/client"
import { countKwForSpecificTemp } from "./countKwForSpecificTemp";
import { getPompaData } from "./getPompaData";
import { getPunktBiwalentny } from "./getPunktBiwalentny";
type Point = { x: number; y: number };

export const findBestFitProduct = ({
    products, 
    proj_temp_outside, 
    needed_kw,
    temp_inside,
    max_install_temp
}: {
    products: Product[], 
    proj_temp_outside: number, 
    needed_kw: number,
    temp_inside: number,
    max_install_temp: number
}) => {
        const toTempArray = [-25, -20, -15, -10, -7, -2, 2, 7, 10, 15];
        const toPompArray = [-25, -20, -15, -10, -7, -2, 2, 7, 10, 15];

        let tempArray: Point[] = [];

        let raport: any = []

        toTempArray.forEach(number => {
            tempArray.push({x: number, y: countKwForSpecificTemp({
                temp_outside: number,
                temp_inside_project: temp_inside,
                temp_outside_climate: proj_temp_outside,
                power_kW: needed_kw
            })})
        })

        products.map((singleProduct: Product) =>  {
            let pompArray: Point[] = [];

            toPompArray.forEach((number: any) => {
                pompArray.push({x: number, y: getPompaData({pompa: singleProduct, max_power: max_install_temp, outside_temp: number.toString()})})
            })

            console.log(pompArray)

            const punktBiwa: any = getPunktBiwalentny(tempArray, pompArray);
            const perfectBiwaPoint = proj_temp_outside/2;
            const isGood = Math.abs(Math.abs(perfectBiwaPoint)-Math.abs(punktBiwa.x)) > 2 ? false : true;
    
            raport.push({
                product: singleProduct,
                productName: singleProduct.desc,
                isGood: isGood,
                type: singleProduct.type,
                range: Math.abs(Math.abs(perfectBiwaPoint)-Math.abs(punktBiwa.x))
            })
        })

        let fitting_products: any = []

        raport = raport.filter((r: any) => r.isGood && r)
        let monobloks = raport.filter((r: any) => r.type == 'Monoblok')
        let splits = raport.filter((r: any) => r.type == 'Split')
        let allinones = raport.filter((r: any) => r.type == 'All-In-One')

        monobloks = monobloks.sort((a: any, b: any) => a.range > b.range ? 1 : -1)
        splits = splits.sort((a: any, b: any) => a.range > b.range ? 1 : -1)
        allinones = allinones.sort((a: any, b: any) => a.range > b.range ? 1 : -1)

        monobloks[0] && fitting_products.push(monobloks[0])
        splits[0] && fitting_products.push(splits[0])
        allinones[0] && fitting_products.push(allinones[0])

        return fitting_products;
}