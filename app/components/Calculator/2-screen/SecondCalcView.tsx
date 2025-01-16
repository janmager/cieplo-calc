import React, { useEffect, useState } from 'react'
import NextButton from '../../Customs/NextButton'
import SecondStepView0 from './0-step/SecondStepView0'
import SecondStepView1 from './1-step/SecondStepView1'
import SecondStepView2 from './2-step/SecondStepView2'
import SecondStepView3 from './3-step/SecondStepView3'
import SecondStepView4 from './4-step/SecondStepView4'
import SecondStepView5 from './5-step/SecondStepView5'

const steps: any = {
  0: {
    title: 'Obliczanie zapotrzebowania cieplnego budynku',
    desc: 'Etap doboru jest bardzo ważny. Podane informacje będą miały wpływ na późniejszą pracę urządzenia.',
    breadcrumbTitle: 'Rodzaj budynku',
  },
  1: {
    title: 'Wymiary',
    desc: 'Etap doboru jest bardzo ważny. Podane informacje będą miały wpływ na późniejszą pracę urządzenia.',
    breadcrumbTitle: 'Wymiary',
  },
  2: {
    title: 'Ściany',
    desc: 'Etap doboru jest bardzo ważny. Podane informacje będą miały wpływ na późniejszą pracę urządzenia.',
    breadcrumbTitle: 'Ściany',
  },
  3: {
    title: 'Poddasze i parter',
    desc: 'Etap doboru jest bardzo ważny. Podane informacje będą miały wpływ na późniejszą pracę urządzenia.',
    breadcrumbTitle: 'Poddasze i parter',
  },
  4: {
    title: 'Ogrzewanie budynku',
    desc: 'Etap doboru jest bardzo ważny. Podane informacje będą miały wpływ na późniejszą pracę urządzenia.',
    breadcrumbTitle: 'Ogrzewanie',
  },
  5: {
    title: 'Podsumowanie',
    desc: false,
    breadcrumbTitle: 'Wynik',
  },
}

const needInstalacjaGrzewcza = [
  'Pompa ciepła powietrze-woda',
  'Pompa ciepła gruntowa',
  'Kocioł na drewno z buforem ciepła',
  'Kocioł na drewno',
  'Kocioł na pellet drzewny',
  'Kocioł na zrębkę drzewną',
  'Kocioł gazowy kondensacyjny',
  'Kocioł gazowy niekondensacyjny',
  'Kocioł węglowy bez podajnika z buforem ciepła',
  'Kocioł węglowy bez podajnika',
  'Kocioł węglowy z podajnikiem',
  'Kocioł olejowy',
  'Sieć ciepłownicza',
  'Kominek',
]

const needMaxTempFromInstalation = [
  '100% grzejniki',
  'Przewaga grzejników + nieco podłogowego/ściennego',
  'Mniej więcej po równo grzejników i podłogowego/ściennego'
]

function SecondCalcView({formData, setFormData, errors, setErrors}: {formData: any, setFormData: any, errors: any, setErrors: any}) {
  const [ step, setStep ] = useState(0)

  const validation = () => {
    let valid = true;

    if(step == 0){
      if(!formData.building_type){
        valid = false;
        setErrors({...errors, 'building_type' : true});
        return false;
      }
    }
    
    if(step == 1){
      if(!formData.building_outline){
        valid = false;
        setErrors({...errors, 'building_outline' : true});
        return false;
      }
      if(formData.building_outline == 'Regularny – prostokątny' && !formData.building_outline_sizes){
        valid = false;
        setErrors({...errors, 'building_outline_sizes' : true});
        return false;
      }
      if(formData.building_outline == 'Regularny – prostokątny' && formData.building_outline_sizes == 'Znam wymiary zewnętrzne budynku' && Number(formData.building_outline_length_m) < 2){
        valid = false;
        setErrors({...errors, 'building_outline_length_m' : {msg: 'Podaj prawidłową długość obrysu'}});
        return false;
      }
      if(formData.building_outline == 'Regularny – prostokątny' && formData.building_outline_sizes == 'Znam wymiary zewnętrzne budynku' && Number(formData.building_outline_width_m) < 2){
        valid = false;
        setErrors({...errors, 'building_outline_width_m' : {msg: 'Podaj prawidłową szerokość obrysu'}});
        return false;
      }
      if(formData.building_outline == 'Regularny – prostokątny' && formData.building_outline_sizes == 'Znam powierzchnię zabudowy' && Number(formData.building_area) < 2){
        valid = false;
        setErrors({...errors, 'building_area' : {msg: 'Podaj prawidłową powierzchnię zabudowy'}});
        return false;
      }
      if(formData.building_outline == 'Nieregularny (wszelkie inne kształty)' && Number(formData.building_area) < 2){
        valid = false;
        setErrors({...errors, 'building_area' : {msg: 'Podaj prawidłową powierzchnię zabudowy'}});
        return false;
      }
      if(formData.building_outline == 'Nieregularny (wszelkie inne kształty)' && Number(formData.building_outline_m) < 2){
        valid = false;
        setErrors({...errors, 'building_outline_m' : {msg: 'Podaj prawidłowy obwód budynku'}});
        return false;
      } 
      if(!formData.house_levels_height){
        valid = false;
        setErrors({...errors, 'house_levels_height' : true});
        return false;
      }
      if(!formData.house_garage){
        valid = false;
        setErrors({...errors, 'house_garage' : true});
        return false;
      }
    }

    if(step == 2){
      if(!formData.building_construction_type){
        valid = false;
        setErrors({...errors, 'building_construction_type' : true});
        return false;
      }
      if(Number(formData.total_wall_thickness) <= 0){
        valid = false;
        setErrors({...errors, 'total_wall_thickness' : {msg: 'Podaj prowidłową grubość ścian'}});
        return false;
      }
      if(formData.building_construction_type == 'Tradycyjna - murowana lub z drewna' && !formData.basic_construction_material){
        valid = false;
        setErrors({...errors, 'basic_construction_material' : {msg: 'Wybierz materiał z listy'}});
        return false;
      }
      if(formData.building_construction_type == 'Szkieletowa - dom kanadyjski' && !formData.wall_insulation){
        valid = false;
        return false;
      }
      if(formData.wall_insulation && !formData.wall_inside_insulation){
        valid = false;
        setErrors({...errors, 'wall_inside_insulation' : {msg: 'Wybierz materiał z listy'}});
        return false;
      }
      if(formData.wall_insulation && Number(formData.wall_insulation_thickness) <= 0){
        valid = false;
        setErrors({...errors, 'wall_insulation_thickness' : {msg: 'Podaj poprawną grubość'}});
        return false;
      }
      if(formData.house_insulation && !formData.outside_insulation){
        valid = false;
        setErrors({...errors, 'outside_insulation' : {msg: 'Wybierz materiał z listy'}});
        return false;
      }
      if(formData.house_insulation && Number(formData.insulation_thickness) <= 0){
        valid = false;
        setErrors({...errors, 'insulation_thickness' : {msg: 'Podaj poprawną grubość'}});
        return false;
      }
      if(!formData.windows_type){
        valid = false;
        setErrors({...errors, 'windows_type' : {msg: 'Wybierz rodzaj okien z listy'}});
        return false;
      }
      if(formData.windows_number  == ''|| Number(formData.windows_number) < 0){
        valid = false;
        setErrors({...errors, 'windows_number' : {msg: 'Podaj prawidłową ilość okien'}});
        return false;
      }
      if(formData.taras_doors_number == '' || Number(formData.taras_doors_number) < 0){
        valid = false;
        setErrors({...errors, 'taras_doors_number' : {msg: 'Podaj prawidłową ilość drzwi balkonowych'}});
        return false;
      }
      if(formData.large_glazings_number == '' || Number(formData.large_glazings_number) < 0){
        valid = false;
        setErrors({...errors, 'large_glazings_number' : {msg: 'Podaj prawidłową ilość dużych przeszkleń'}});
        return false;
      }
      if(!formData.doors_type){
        valid = false;
        setErrors({...errors, 'doors_type' : {msg: 'Wybierz rodzaj drzwi z listy'}});
        return false;
      }
      if(formData.outside_doors_number == '' || Number(formData.outside_doors_number) < 0){
        valid = false;
        setErrors({...errors, 'outside_doors_number' : {msg: 'Podaj prawidłową ilość drzwi zewnętrznych'}});
        return false;
      }
      if(formData.building_type == 'Budynek wielorodzinny' && (formData.number_stairways == '' || Number(formData.number_stairways) < 0)){
        valid = false;
        setErrors({...errors, 'number_stairways' : {msg: 'Podaj prawidłową ilość klatek schodowych'}});
        return false;
      }
      if(formData.building_type == 'Budynek wielorodzinny' && (formData.number_elevators == '' || Number(formData.number_elevators) < 0)){
        valid = false;
        setErrors({...errors, 'number_elevators' : {msg: 'Podaj prawidłową ilość wind w budynku'}});
        return false;
      }
    }

    if(step == 3){
      if(!formData.is_roof_isolation){
        valid = false;
        setErrors({...errors, 'is_roof_isolation' : true});
        return false;
      }
      if(formData.is_roof_isolation == 'Tak, jest jakaś izolacja' && !formData.isolation_roof_material){
        valid = false;
        setErrors({...errors, 'isolation_roof_material' : {msg: 'Wybierz materiał z listy'}});
        return false;
      }
      if(formData.is_roof_isolation == 'Tak, jest jakaś izolacja' && (formData.isolation_roof_thickness == '' || Number(formData.isolation_roof_thickness) < 0)){
        valid = false;
        setErrors({...errors, 'isolation_roof_thickness' : {msg: 'Wybierz materiał z listy'}});
        return false;
      }
      if(!formData.is_parter_floor_isolation){
        valid = false;
        setErrors({...errors, 'is_parter_floor_isolation' : true});
        return false;
      }
      if(formData.is_parter_floor_isolation == 'Tak, jest jakaś izolacja' && !formData.isolation_parter_floor_material){
        valid = false;
        setErrors({...errors, 'isolation_parter_floor_material' : {msg: 'Wybierz materiał z listy'}});
        return false;
      }
      if(formData.is_parter_floor_isolation == 'Tak, jest jakaś izolacja' && (formData.isolation_parter_floor_thickness == '' || Number(formData.isolation_roof_thickness) < 0)){
        valid = false;
        setErrors({...errors, 'isolation_parter_floor_thickness' : {msg: 'Wybierz materiał z listy'}});
        return false;
      }
    }

    if(step == 4){
      if(!formData.main_heat_sources){
        valid = false;
        setErrors({...errors, 'main_heat_sources' : true});
        return false;
      }
      if(formData.temp_in_heat_rooms  == ''|| Number(formData.temp_in_heat_rooms) < 0){
        valid = false;
        setErrors({...errors, 'temp_in_heat_rooms' : {msg: 'Podaj prawidłową temperaturę'}});
        return false;
      }
      if(!formData.vent_type){
        valid = false;
        setErrors({...errors, 'vent_type' : true});
        return false;
      }
      if(needInstalacjaGrzewcza.indexOf(formData.main_heat_sources) >= 0 && !formData.type_of_heating_instalation){
        valid = false;
        setErrors({...errors, 'type_of_heating_instalation' : true});
        return false;
      }
      if(needInstalacjaGrzewcza.indexOf(formData.main_heat_sources) >= 0 && needMaxTempFromInstalation.indexOf(formData.type_of_heating_instalation) >= 0 && !formData.max_temp_of_power_instalation){
        valid = false;
        setErrors({...errors, 'max_temp_of_power_instalation' : true});
        return false;
      }
      if(formData.building_type == 'Mieszkanie' && !formData.whats_over){
        valid = false;
        setErrors({...errors, 'whats_over' : true});
        return false;
      }
      if(formData.building_type == 'Mieszkanie' && !formData.whats_under){
        valid = false;
        setErrors({...errors, 'whats_under' : true});
        return false;
      }
      if(formData.building_type == 'Mieszkanie' && !formData.whats_north){
        valid = false;
        setErrors({...errors, 'whats_north' : true});
        return false;
      }
      if(formData.building_type == 'Mieszkanie' && !formData.whats_east){
        valid = false;
        setErrors({...errors, 'whats_east' : true});
        return false;
      }
      if(formData.building_type == 'Mieszkanie' && !formData.whats_south){
        valid = false;
        setErrors({...errors, 'whats_south' : true});
        return false;
      }
      if(formData.building_type == 'Mieszkanie' && !formData.whats_west){
        valid = false;
        setErrors({...errors, 'whats_west' : true});
        return false;
      }
      if(formData.count_need_energy_cwu && (formData.hot_water_person_using == '' || Number(formData.hot_water_person_using) < 0)){
        valid = false;
        setErrors({...errors, 'hot_water_person_using' : {msg: 'Podaj poprawną ilość osób'}});
        return false;
      }
      if(formData.count_need_energy_cwu && !formData.hot_water_using_style){
        valid = false;
        setErrors({...errors, 'hot_water_using_style' : true});
        return false;
      }
    }

    if(valid){
      setStep(step+1)
      window.scrollTo(0, 0);
    }
  }

  return (
    <div className='flex flex-col'>
      {/* breadcrumbs */}
      <div className='h-[165px] w-full flex items-center justify-center bg-[#F5F5F5]'>
        <div className='flex cursor-default flex-row gap-1.5 md:gap-2.5 lg:gap-4 xl:gap-5 text-[13px] lg:text-[15px] items-center mt-[62px] justify-center'>
        {
          Object.keys(steps).map((item: any, idx) => {
            return (
              <div key={idx} className='flex flex-row gap-1.5 md:gap-2.5 lg:gap-4 xl:gap-5 items-center justify-center'>
                <span className={`${item == step ? 'font-bold text-[#FF4510] text-center' : 'hidden md:block'}`}>{steps[item].breadcrumbTitle}</span>
                {item != step && <span className={`rounded-full border ${parseInt(item) < step ? 'bg-[#FF4510] border-[#FF4510] text-white' : 'border-[#CACACA] text-gray-600'} font-[600] w-[28px] h-[28px] flex items-center justify-center md:hidden`}>{parseInt(item)+1}</span>}
                {item < Object.keys(steps).length-1 && <div className='h-[1px] w-[10px] md:w-[30px] lg:w-[55px] bg-[#CACACA]'></div>}
              </div>
            )
          })
        }
        </div>
      </div>
      {/* dynamic box */}
      {step < 5 && <div className="max-w-[1172px] px-5 w-full mx-auto mt-10 mb-3">
        <div className='text-[32px] md:text-[50px] font-[600] max-w-[800px] leading-[110%]'>{steps[step].title}</div>
        <div className='text-[20px] md:text-[30px] leading-[36px] font-[400] mt-5 md:mt-10 max-w-[900px]'>{steps[step].desc}</div>
      </div>}
      {/* user interactive zone */}
      <div className='max-w-[1172px] px-5 w-full mx-auto mt-10 mb-5'>
        {/* step 0 */}
        {step == 0 && <SecondStepView0 errors={errors} setErrors={setErrors} formData={formData} setFormData={setFormData} />}
        {/* step 1 */}
        {step == 1 && <SecondStepView1 errors={errors} setErrors={setErrors} formData={formData} setFormData={setFormData} />}
        {/* step 2 */}
        {step == 2 && <SecondStepView2 errors={errors} setErrors={setErrors} formData={formData} setFormData={setFormData} />}
        {/* step 3 */}
        {step == 3 && <SecondStepView3 errors={errors} setErrors={setErrors} formData={formData} setFormData={setFormData} />}
        {/* step 4 */}
        {step == 4 && <SecondStepView4 errors={errors} setErrors={setErrors} formData={formData} setFormData={setFormData} />}
        {/* step 5 */}
        {step == 5 && <SecondStepView5 errors={errors} setErrors={setErrors} formData={formData} setFormData={setFormData} />}
      </div>
      {step < 5 && <div className='max-w-[1172px] px-5 mt-10 w-full flex mb-5 justify-end mx-auto'>
        <NextButton onClick={validation} />
      </div>}
    </div>
  )
}

export default SecondCalcView