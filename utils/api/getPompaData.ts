type MaxPower = '25' | '30' | '35' | '40' | '45' | '50';
type OutsideTemp = '-25' | '-20' | '-15' | '-10' | '-7' | '-2' | '2' | '7' | '10' | '15';

export const getPompaData = ({max_power, outside_temp, pompa} : {max_power: any, outside_temp: OutsideTemp, pompa: any}) => {
    console.log(pompa)
    return pompa[`p${max_power}_${outside_temp.indexOf('-') >= 0 ? `minus${Math.abs(Number(outside_temp))}` : `plus${Math.abs(Number(outside_temp))}`}`];
}

