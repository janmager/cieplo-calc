export const apiDictionary: any = {
    // building_type
    'Dom jednorodzinny' : 'single_house',
    'Bliźniak (połowa budynku)' : 'double_house',
    'Segment w zabudowanie szeregowej' : 'row_house',
    'Mieszkanie' : 'apartment',
    'Budynek wielorodzinny' : 'multifamily',

    // construction_year
    '2025' : '2020',
    '2024' : '2020',
    '2023' : '2020',
    '2022' : '2020',
    '2021' : '2020',
    '2020' : '2020',
    '2010-2019' : '2011',
    '2000-2009' : '2000',
    '1990-1999' : '1990',
    '1980-1989': '1980',
    '1970-1979' : '1970',
    'starsze' : '1960',

    // construction_type
    'Tradycyjna - murowana lub z drewna' : 'traditional',
    'Szkieletowa - dom kanadyjski' : 'canadian',

    // building_shape
    'Regularny – prostokątny' : 'regular',
    'Nieregularny (wszelkie inne kształty)' : 'irregular',

    // building_floors
    'Parterowy' : '1',
    'Jednopiętrowy' : '2',
    'Dwupiętrowy' : '3',
    'Trzypiętrowy' : '4',
    'Czteropiętrowy' : '5',
    'Pięciopiętrowy' : '6',
    'Sześciopiętrowy' : '7',
    'Siedmiopiętrowy' : '8',
    'Ośmiopiętrowy' : '9',
    'Dziewięciopiętrowy' : '10',
    'Dziesięciopiętrowy' : '11',
    'Jedenastopiętrowy' : '12',
    'Dwunastopiętrowy' : '13',
    'Jednopoziomowe' : '1',
    'Dwupoziomowe' : '2',
    'Trzypoziomowe' : '3',

    // floor_height
    'Niskie (poniżej 2,5m)' : '2.3',
    'Standardowe (ok. 2,6m)' : '2.6',
    'Wysokie (ok. 3m)' : '3.1',
    'Bardzo wysokie (4m i więcej)' : '4.1',

    // building_roof
    'Płaski' : 'flat',
    'Skośny z poddaszem' : 'steep',
    'Skośny bez poddasza' : 'oblique',

    // garage_type
    'Brak' : 'none',
    'Jednostanowiskowy nieogrzewany' : 'single_unheated',
    'Jednostanowiskowy (d)ogrzewany' : 'single_heated',
    'Dwustanowiskowy nieogrzewany' : 'double_unheated',
    'Dwustanowiskowy (d)ogrzewany' : 'double_heated',

    // primary_wall_material & secondary_wall_material
    "Beton" : "51",
    "Beton komórkowy" : "54",
    "Bloczek silikatowy": "96",
    "Cegła dziurawka" : "58",
    "Cegła klinkierowa" : "62",
    "Cegła kratówka" : "59",
    "Cegła pełna" : "57",
    "Cegła silikatowa dziurawka" : "61",
    "Cegła silikatowa pełna" : "60",
    "Celuloza" : "98",
    "Drewno iglaste" : "56",
    "Drewno liściaste" : "55",
    "Glina" : "93",
    "Granit" : "77",
    "Kamień polny" : "76",
    "Keramzytobeton" : "97",
    "Marmur" : "78",
    "Piaskowiec" : "79",
    "PIR" : "95",
    "Porotherm" : "84",
    "PUR" : "86",
    "Pustak keramzytowy" : "85",
    "Pustak żużlobetonowy" : "53",
    "Pustaki ceramiczne" : "63",
    "Styropian" : "70",
    "Styropian grafitowy" : "88",
    "Styropian twardy (XPS)" : "71",
    "Termalica 300/400" : "90",
    "Termalica 600/650" : "91",
    "Thermomur" : "92",
    "Wapień" : "80",
    "Wełna drzewna" : "94",
    "Wełna mineralna" : "68",
    "Wiórobeton" : "83",
    "Ytong" : "89",
    "Ytong PP5" : "100",
    "Ytong Ultra+" : "99",
    "Żelbet" : "52",

    // internal_wall_isolation
    "Ekofiber" : "87",
    "Korek" : "64",
    "Multipor" : "101",
    "Padzierz lniany" : "81",
    "Pustka powietrzna" : "82",
    "Słoma" : "65",
    "Trzcina" : "66",
    "Wełna mineralna granulowana" : "69",

    // top_isolation & bottom_isolation
    "Keramzyt" : "74",
    "Trociny drzewne" : "75",
    "Żużel" : "73",

    // doors_type
    'Nowe drewniane' : 'new_wooden',
    'Stare drewniane' : 'old_wooden',
    'Nowe metalowe' : 'new_metal',
    'Stare metalowe' : 'old_metal',
    'Nowe z tworzywa' : 'new_pvc',

    // windows_type
    'Stare z pojedynczą szybą' : 'old_single_glass',
    'Stare z min. dwiema szybami' : 'old_double_glass',
    'Starsze (10+ lat) ale z szybami zespolonymi' : 'semi_new_double_glass',
    'Współczesne dwuszybowe' : 'new_double_glass',
    'Współczesne trójszybowe' : 'new_triple_glass',

    // windows_type_docs_api_updated
    'Starsze z pojedynczą zwykłą szybą' : 'old_single_glass',
    'Starsze z min. dwiema zwykłymi szybami' : 'old_double_glass',
    'Starsze z szybami zespolonymi' : 'semi_new_double_glass',
    '2011-2020 dwuszybowe' : 'new_double_glass',
    '2011-2020 trójszybowe' : 'new_triple_glass',
    '2021+ dwuszybowe' : '2021_double_glass',
    '2021+ trójszybowe' : '2021_triple_glass',


    // ventilation_type
    'Mechaniczna' : 'mechanical',
    'Naturalna lub grawitacyjna' : 'natural',
    'Mechaniczna z odzyskiem ciepła' : 'mechanical_recovery',

    // hot_water_usage
    'Tylko prysznice' : 'shower',
    'Głównie przysznice, czasem wanna' : 'shower_bath',
    'Najczęściej wanna' : 'bath',

    // whats_over, whats_under, whats_north etc.
    'Ogrzewany lokal' : 'heated_room',
    'Nieogrzewany lokal' : 'unheated_room',
    'Nieogrzewany lokal lub piwnica' : 'unheated_room',
    'Świat zewnętrzny' : 'outdoor',
    'Grunt' : 'ground',
    'Nieogrzewany lokal / korytarz / klatka schodowa' : 'unheated_room',

    "Brak izolacji i odczuwalne są silne przeciągi" : "worst",
    "Brak izolacji, ale bez przeciągów, odczuwalna jest niska temperatura" : "poor",
    "Ocieplenie dachu jest, ale słabej jakości" : "medium",
    "Dach jest dobrze ocieplony" : "great",

    "Pomieszczenie jest dość szczelne, ale ocieplone słabiej niż mieszkanie" : "medium",
    "To pomieszczenie mieszkalne ocieplone nie gorzej jak nasze, tylko chwilowo nikt tam nie mieszka" : "great",


    '' : null,
    '-' : null
}