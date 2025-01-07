import React, { useState } from 'react'
import RaportOverviewWithSuggestion from './RaportOverviewWithSuggestion/RaportOverviewWithSuggestion'
import ContactDetails from './ContactDetails/ContactDetails'
import FullRaportPreview from './FullRaportPreview/FullRaportPreview'

function SecondStepView5({formData, setFormData}: {formData: any, setFormData: any}) {
    const [ currentStep, setCurrentStep ] = useState(1)
  
    return (
        <div className='flex flex-col gap-14 w-full'>
            {currentStep == 1 && <RaportOverviewWithSuggestion formData={formData} step={currentStep} setStep={setCurrentStep} setFormData={setFormData} /> }
            {currentStep == 2 && <ContactDetails formData={formData} step={currentStep} setStep={setCurrentStep} setFormData={setFormData} /> }
            {currentStep == 3 && <FullRaportPreview formData={formData} step={currentStep} setStep={setCurrentStep} setFormData={setFormData} /> }
        </div>
    )
}

export default SecondStepView5