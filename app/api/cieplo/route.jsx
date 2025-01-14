import { raportEmailTemplate } from "@/templates/emails/raportEmailTemplate";
const nodemailer = require('nodemailer');
import { fetchRaportData } from "@/utils/supabase/fetchRaportData";
import { NextResponse, NextRequest } from 'next/server'

export async function POST(request) {
    const formData = await request.json()
    const token = formData.token

    const formatedData = {
        token: process.env.NEXT_PUBLIC_API_KEY,
        "building_type": "single_house",
        "construction_year": 2020,
        "construction_type": "traditional",
        "latitude": 51.4453433,
        "longitude": 16.2334445,
        "building_length": 12.5,
        "building_width": 6,
        "floor_area": 45,
        "floor_perimeter": 125,
        "building_floors": 3,
        "building_heated_floors": [0, 1, 2],
        "floor_height": 2.6,
        "building_roof": "steep",
        "has_basement": true,
        "has_balcony": true,
        "has_garage": false,
        "garage_type": "double_unheated",
        "wall_size": 65,
        "primary_wall_material": 57,
        "secondary_wall_material": null,
        "internal_wall_isolation": {
            "material": 88,
            "size": 5
        },
        "external_wall_isolation": {
            "material": 88,
            "size": 15
        },
        "top_isolation": {
            "material": 68,
            "size": 35
        },
        "bottom_isolation": {
            "material": 71,
            "size": 5
        },
        "number_doors": 2,
        "number_balcony_doors": 2,
        "number_windows": 12,
        "number_huge_windows": 0,
        "doors_type": "new_metal",
        "windows_type": "new_double_glass",
        "indoor_temperature": 21,
        "ventilation_type": "natural",
        "include_hot_water": true,
        "hot_water_persons": 3,
        "hot_water_usage": "shower_bath",
        "whats_over": "heated_room",
        "whats_under": "heated_room",
        "whats_north": "heated_room",
        "whats_south": "unheated_room",
        "whats_east": "heated_room",
        "whats_west": "outdoor",
        "on_corner": true,
        "unheated_space_under_type": "worst",
        "unheated_space_over_type": "great"
    }

    console.log(formatedData)

    try {
        const result = await fetch(
            `https://cieplo.app/api/calculation`,
            {
                method: 'GET',
                headers: {
                    'token': 'd45a59c760cf7aca5764a9aa7d9647093f797ca1',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(formatedData)
            }
        )
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
        });

        if (!result.ok) {
            throw new Error(`response status: ${result.status}`);
        }

        let res = await result.json();

        console.log(res)

        return NextResponse.json({ message: "Success !!!" })

    } catch (e) {
        console.log(e);
        NextResponse.status(500).json({ message: "COULD NOT SEND MESSAGE" })

    }
}