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

function SecondCalcView({formData, setFormData,setViewId}: {formData: any, setViewId: any, setFormData: any}) {
  const [ step, setStep ] = useState(0)
  const [ validButton, setValidButton ] = useState(false)

  // forms validations
  useEffect(() => {
    let valid = false;
    if(step == 0){
      if(formData.building_type) valid = true
      else valid = false
    }
    else if(step == 1){
      if(formData.building_outline != ''){
        if(
          formData.building_outline == 'Regularny – prostokątny' && 
          formData.building_outline_sizes == 'Znam wymiary zewnętrzne budynku' && 
          Number(formData.building_outline_length_m) > 0 && 
          Number(formData.building_outline_width_m) > 0
        ){
          valid = true
        }
        else if(
          formData.building_outline == 'Regularny – prostokątny' && 
          formData.building_outline_sizes == 'Znam powierzchnię zabudowy' && 
          Number(formData.building_area) > 0
        ){
          valid = true
        }
        else if(
          formData.building_outline == 'Nieregularny (wszelkie inne kształty)' && 
          Number(formData.building_area) > 0 && 
          Number(formData.building_outline_m) > 0
        ){
          valid = true
        }
        else valid = false;

        if(valid){
          if(
            formData.house_floor_plan.length > 0 && 
            formData.house_roof_plan.length > 0 &&
            formData.house_levels_height.length > 0 &&
            formData.house_garage.length > 0
          ){
            valid = true;
          }
          else valid = false;
        }
      }
      else valid = false
    }
    else if(step == 2){
      if(
        formData.building_construction_type.length > 0 &&
        Number(formData.total_wall_thickness) >= 0 &&
        formData.windows_type.length > 0 &&
        Number(formData.windows_number) >= 0 &&
        Number(formData.taras_doors_number) >= 0 &&
        Number(formData.large_glazings_number) >= 0 &&
        Number(formData.outside_doors_number) >= 0 &&
        formData.doors_type.length > 0
      ){
        if(
          ((formData.house_insulation && formData.outside_insulation.length > 0 && Number(formData.insulation_thickness) > 0) || !formData.house_insulation) &&
          ((formData.wall_insulation && formData.wall_inside_insulation.length > 0 && Number(formData.wall_insulation_thickness) > 0) || !formData.wall_insulation) &&
          ((formData.building_construction_type.indexOf('Tradycyjna') >= 0 && formData.basic_construction_material.length > 0) || formData.building_construction_type.indexOf('Tradycyjna') == -1) &&
          ((formData.building_type == 'Budynek wielorodzinny' && formData.number_stairways >= 0 && formData.number_elevators >= 0) || formData.building_type != 'Budynek wielorodzinny')
        ){ valid = true }
        else valid = false;
      }
      else valid = false;
    }
    else if(step == 3){
      if(
        formData.is_roof_isolation && ((formData.is_roof_isolation.indexOf('Tak') >= 0 && formData.isolation_roof_material && parseInt(formData.isolation_roof_thickness) > 0) || formData.is_roof_isolation.indexOf('Nie') >= 0) &&
        formData.is_parter_floor_isolation && ((formData.is_parter_floor_isolation.indexOf('Tak') >= 0 && formData.isolation_parter_floor_material && parseInt(formData.isolation_parter_floor_thickness) > 0) || formData.is_parter_floor_isolation.indexOf('Nie') >= 0)
      ){
        valid = true
      }
      else valid = false;
    }
    else if(step == 4){
      if(
        Number(formData.temp_in_heat_rooms) > 0 &&
        formData.vent_type.length > 0 &&
        (formData.main_heat_sources.length > 0 && ((formData.main_heat_sources == 'Pompa ciepła powietrze-woda' || formData.main_heat_sources == 'Pompa ciepła gruntowa' || formData.main_heat_sources == 'Kocioł na drewno z buforem ciepła' || formData.main_heat_sources == 'Kocioł na drewno' || formData.main_heat_sources == 'Kocioł na pellet drzewny' || formData.main_heat_sources == 'Kocioł na zrębkę drzewną' || formData.main_heat_sources == 'Kocioł gazowy kondensacyjny' || formData.main_heat_sources == 'Kocioł gazowy niekondensacyjny' || formData.main_heat_sources == 'Kocioł węglowy bez podajnika z buforem ciepła' || formData.main_heat_sources == 'Kocioł węglowy bez podajnika' || formData.main_heat_sources == 'Kocioł węglowy z podajnikiem' || formData.main_heat_sources == 'Kocioł olejowy' || formData.main_heat_sources == 'Kominek' || formData.main_heat_sources == 'Sieć ciepłownicza') && formData.type_of_heating_instalation.length > 0) || (formData.main_heat_sources == 'Pompa ciepła powietrze-powietrze (klimatyzacja)' || formData.main_heat_sources == 'Prąd: promienniki podczerwieni / maty grzewcze' || formData.main_heat_sources == 'Prąd: piec akumulacyjny / bufor wodny z grzałkami' || formData.main_heat_sources == 'Piec (kaflowy, kuchenny, koza itp.)')) &&
        (((formData.main_heat_sources == 'Pompa ciepła powietrze-woda' || formData.main_heat_sources == 'Pompa ciepła gruntowa' || formData.main_heat_sources == 'Kocioł na drewno z buforem ciepła' || formData.main_heat_sources == 'Kocioł na drewno' || formData.main_heat_sources == 'Kocioł na pellet drzewny' || formData.main_heat_sources == 'Kocioł na zrębkę drzewną' || formData.main_heat_sources == 'Kocioł gazowy kondensacyjny' || formData.main_heat_sources == 'Kocioł gazowy niekondensacyjny' || formData.main_heat_sources == 'Kocioł węglowy bez podajnika z buforem ciepła' || formData.main_heat_sources == 'Kocioł węglowy bez podajnika' || formData.main_heat_sources == 'Kocioł węglowy z podajnikiem' || formData.main_heat_sources == 'Kocioł olejowy' || formData.main_heat_sources == 'Kominek' || formData.main_heat_sources == 'Sieć ciepłownicza') && ((formData.type_of_heating_instalation == '100% grzejniki' || formData.type_of_heating_instalation == 'Przewaga grzejników + nieco podłogowego/ściennego' || formData.type_of_heating_instalation == 'Mniej więcej po równo grzejników i podłogowego/ściennego') && formData.max_temp_of_power_instalation.length > 0) || (formData.type_of_heating_instalation == 'Przewaga podłogowego/ściennego + nieco grzejników' || formData.type_of_heating_instalation == '100% podłogowe / ścienne' || formData.type_of_heating_instalation == 'Ogrzewanie nadmuchowe' || formData.type_of_heating_instalation == 'Brak centralnego ogrzewania')) || (formData.main_heat_sources == 'Pompa ciepła powietrze-powietrze (klimatyzacja)' || formData.main_heat_sources == 'Prąd: promienniki podczerwieni / maty grzewcze' || formData.main_heat_sources == 'Prąd: piec akumulacyjny / bufor wodny z grzałkami' || formData.main_heat_sources == 'Piec (kaflowy, kuchenny, koza itp.)')) &&
        ((formData.building_type == 'Mieszkanie' && formData.whats_over.length > 0 && formData.whats_under.length > 0 && formData.whats_north.length > 0 && formData.whats_south.length > 0 && formData.whats_east.length > 0 && formData.whats_west.length > 0) || formData.building_type != 'Mieszkanie')
      ){
        if((formData.count_need_energy_cwu && Number(formData.hot_water_person_using) > 0 && formData.hot_water_using_style.length > 0) || !formData.count_need_energy_cwu){ valid = true }
        else valid = false;
      }
      else valid = false;
    }
    else valid = false;
    setValidButton(valid)
  }, [formData])

  useEffect(() => {
    setValidButton(false)
  }, [step])

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
        {step == 0 && <SecondStepView0 formData={formData} setFormData={setFormData} />}
        {/* step 1 */}
        {step == 1 && <SecondStepView1 formData={formData} setFormData={setFormData} />}
        {/* step 2 */}
        {step == 2 && <SecondStepView2 formData={formData} setFormData={setFormData} />}
        {/* step 3 */}
        {step == 3 && <SecondStepView3 formData={formData} setFormData={setFormData} />}
        {/* step 4 */}
        {step == 4 && <SecondStepView4 formData={formData} setFormData={setFormData} />}
        {/* step 5 */}
        {step == 5 && <SecondStepView5 formData={formData} setFormData={setFormData} />}
      </div>
      {step < 5 && <div className='max-w-[1172px] px-5 mt-10 w-full flex mb-5 justify-end mx-auto'>
        <NextButton active={validButton} setViewId={setStep} nextView={step+1} />
      </div>}
    </div>
  )
}

export default SecondCalcView