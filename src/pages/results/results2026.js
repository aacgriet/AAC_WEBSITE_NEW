'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'



const GRIET_ROWS = [
  {
    "S. No": 1,
    "Name": "B. Yashwanth Reddy",
    "Roll No": "26241A0508",
    "Branch": "CSE",
    "Section": "A"
  },
  {
    "S. No": 2,
    "Name": "Sree Prakhyath Mandava",
    "Roll No": "26241A0524",
    "Branch": "CSE",
    "Section": "A"
  },
  {
    "S. No": 3,
    "Name": "Jagirthi Tanviya",
    "Roll No": "26241A0527",
    "Branch": "CSE",
    "Section": "A"
  },
  {
    "S. No": 4,
    "Name": "Pandaga lohith",
    "Roll No": "26241A0529",
    "Branch": "CSE",
    "Section": "A"
  },
  {
    "S. No": 5,
    "Name": "Kutumbaka Sai Saranya",
    "Roll No": "26241A0537",
    "Branch": "CSE",
    "Section": "A"
  },
  {
    "S. No": 6,
    "Name": "Manchala Haasvith Varma",
    "Roll No": "26241A0541",
    "Branch": "CSE",
    "Section": "A"
  },
  {
    "S. No": 7,
    "Name": "Mannapuram Nakshatra",
    "Roll No": "26241A0542",
    "Branch": "CSE",
    "Section": "A"
  },
  {
    "S. No": 8,
    "Name": "Ganga Singh",
    "Roll No": "26241A0550",
    "Branch": "CSE",
    "Section": "A"
  },
  {
    "S. No": 9,
    "Name": "Sai Vidhush",
    "Roll No": "26241A0557",
    "Branch": "CSE",
    "Section": "A"
  },
  {
    "S. No": 10,
    "Name": "K Arjun goud",
    "Roll No": "26241A0559",
    "Branch": "CSE",
    "Section": "A"
  },
  {
    "S. No": 11,
    "Name": "Vegi Chandra Rishith",
    "Roll No": "26241A0564",
    "Branch": "CSE",
    "Section": "A"
  },
  {
    "S. No": 12,
    "Name": "Abhinav Katevarapu",
    "Roll No": "26241A0566",
    "Branch": "CSE",
    "Section": "B"
  },
  {
    "S. No": 13,
    "Name": "Budda Nikhil",
    "Roll No": "26241A0576",
    "Branch": "CSE",
    "Section": "B"
  },
  {
    "S. No": 14,
    "Name": "DHADI RAMYA SRI",
    "Roll No": "26241a0582",
    "Branch": "CSE",
    "Section": "B"
  },
  {
    "S. No": 15,
    "Name": "Kadaverugu Tejaswini",
    "Roll No": "26241A0594",
    "Branch": "CSE",
    "Section": "B"
  },
  {
    "S. No": 16,
    "Name": "K.Shiva Teja",
    "Roll No": "26241A0597",
    "Branch": "CSE",
    "Section": "B"
  },
  {
    "S. No": 17,
    "Name": "Peram Nishitha Reddy",
    "Roll No": "26241A05AE",
    "Branch": "CSE",
    "Section": "B"
  },
  {
    "S. No": 18,
    "Name": "Thota Lalith Narayana",
    "Roll No": "26241A05AS",
    "Branch": "CSE",
    "Section": "B"
  },
  {
    "S. No": 19,
    "Name": "Alankrita Biswas",
    "Roll No": "26241A05AY",
    "Branch": "CSE",
    "Section": "C"
  },
  {
    "S. No": 20,
    "Name": "C.R.Shrika",
    "Roll No": "26241A05B6",
    "Branch": "CSE",
    "Section": "C"
  },
  {
    "S. No": 21,
    "Name": "MOHAMMED ABDUL RAOOF",
    "Roll No": "26241A05C3",
    "Branch": "CSE",
    "Section": "C"
  },
  {
    "S. No": 22,
    "Name": "MOLUGURI RAMCHARAN",
    "Roll No": "26241A05C8",
    "Branch": "CSE",
    "Section": "C"
  },
  {
    "S. No": 23,
    "Name": "Devarakonda Satya Ajay",
    "Roll No": "26241A05DB",
    "Branch": "CSE",
    "Section": "D"
  },
  {
    "S. No": 24,
    "Name": "Mohammed Muzammil Ahmed",
    "Roll No": "26241A05DY",
    "Branch": "CSE",
    "Section": "D"
  },
  {
    "S. No": 25,
    "Name": "Poreddy Adhitya Laxmi",
    "Roll No": "26241A05E5",
    "Branch": "CSE",
    "Section": "D"
  },
  {
    "S. No": 26,
    "Name": "Pakide.Vaishnavi",
    "Roll No": "26241A05E6",
    "Branch": "CSE",
    "Section": "D"
  },
  {
    "S. No": 27,
    "Name": "Sai Atharvan Bunde",
    "Roll No": "26241A05EB",
    "Branch": "CSE",
    "Section": "D"
  },
  {
    "S. No": 28,
    "Name": "Vadla Sharath",
    "Roll No": "26241A05EK",
    "Branch": "CSE",
    "Section": "D"
  },
  {
    "S. No": 29,
    "Name": "Dubasi Sraavya Sree",
    "Roll No": "26241A05F5",
    "Branch": "CSE",
    "Section": "E"
  },
  {
    "S. No": 30,
    "Name": "Gunji Praveen Kumar",
    "Roll No": "26241A05FH",
    "Branch": "CSE",
    "Section": "E"
  },
  {
    "S. No": 31,
    "Name": "Kashish Saini",
    "Roll No": "26241A05FS",
    "Branch": "CSE",
    "Section": "E"
  },
  {
    "S. No": 32,
    "Name": "Katepally snehal",
    "Roll No": "26241A05FT",
    "Branch": "CSE",
    "Section": "E"
  },
  {
    "S. No": 33,
    "Name": "SAI KAUSHIK CHALLARI",
    "Roll No": "26241A05GC",
    "Branch": "CSE",
    "Section": "E"
  },
  {
    "S. No": 34,
    "Name": "Apeksha Dhummansure",
    "Roll No": "26241A05GR",
    "Branch": "CSE",
    "Section": "F"
  },
  {
    "S. No": 35,
    "Name": "BABAYOLLA BHARDWAJ",
    "Roll No": "26241A05GT",
    "Branch": "CSE",
    "Section": "F"
  },
  {
    "S. No": 36,
    "Name": "Balla Lakshya Surya Snigdha",
    "Roll No": "26241A05GV",
    "Branch": "CSE",
    "Section": "F"
  },
  {
    "S. No": 37,
    "Name": "ESHWAROJU SRI ANSHITHA",
    "Roll No": "26241A05H8",
    "Branch": "CSE",
    "Section": "F"
  },
  {
    "S. No": 38,
    "Name": "Lakshveer Singh Jahagirdar",
    "Roll No": "26241A05HR",
    "Branch": "CSE",
    "Section": "F"
  },
  {
    "S. No": 39,
    "Name": "Ananya Agarwal",
    "Roll No": "26241A05JN",
    "Branch": "CSE",
    "Section": "G"
  },
  {
    "S. No": 40,
    "Name": "CHILUKURI SATHWIK",
    "Roll No": "26241A05JY",
    "Branch": "CSE",
    "Section": "G"
  },
  {
    "S. No": 41,
    "Name": "Koppanathi Om Raghu Ram",
    "Roll No": "26241A05KC",
    "Branch": "CSE",
    "Section": "G"
  },
  {
    "S. No": 42,
    "Name": "Kondamalla Ramcharan",
    "Roll No": "26241A05KE",
    "Branch": "CSE",
    "Section": "G"
  },
  {
    "S. No": 43,
    "Name": "MANCHINELLA NIKITHA",
    "Roll No": "26241A05KK",
    "Branch": "CSE",
    "Section": "G"
  },
  {
    "S. No": 44,
    "Name": "M.Aarnav Harshith",
    "Roll No": "26241A05KM",
    "Branch": "CSE",
    "Section": "G"
  },
  {
    "S. No": 45,
    "Name": "Harshit Pokala",
    "Roll No": "26241A05L0",
    "Branch": "CSE",
    "Section": "G"
  },
  {
    "S. No": 46,
    "Name": "THOUTA SAI VIJAYA LAXMI",
    "Roll No": "26241A05LB",
    "Branch": "CSE",
    "Section": "G"
  },
  {
    "S. No": 47,
    "Name": "Bharath krishna",
    "Roll No": "26241a05ld",
    "Branch": "CSE",
    "Section": "G"
  },
  {
    "S. No": 48,
    "Name": "Yellam Keerthana",
    "Roll No": "26241A05LF",
    "Branch": "CSE",
    "Section": "G"
  },
  {
    "S. No": 49,
    "Name": "D.Hasith Vardhan",
    "Roll No": "26241A05LU",
    "Branch": "CSE",
    "Section": "H"
  },
  {
    "S. No": 50,
    "Name": "G.SRIKAR",
    "Roll No": "26241A05M0",
    "Branch": "CSE",
    "Section": "H"
  },
  {
    "S. No": 51,
    "Name": "Mohammed ishaq ahmad",
    "Roll No": "26241A05MK",
    "Branch": "CSE",
    "Section": "H"
  },
  {
    "S. No": 52,
    "Name": "Paleti Abhiram",
    "Roll No": "26241A05MS",
    "Branch": "CSE",
    "Section": "H"
  },
  {
    "S. No": 53,
    "Name": "A.Sai Rishitha",
    "Roll No": "26241A05ND",
    "Branch": "CSE",
    "Section": "I"
  },
  {
    "S. No": 54,
    "Name": "Rishitha Suroju",
    "Roll No": "26241A05PT",
    "Branch": "CSE",
    "Section": "I"
  },
  {
    "S. No": 55,
    "Name": "Suhas Rajapudi",
    "Roll No": "26241A05PU",
    "Branch": "CSE",
    "Section": "I"
  },
  {
    "S. No": 56,
    "Name": "Tanush Reddy",
    "Roll No": "26241A05QJ",
    "Branch": "CSE",
    "Section": "J"
  },
  {
    "S. No": 57,
    "Name": "Karamkonda Harshita",
    "Roll No": "26241A05QZ",
    "Branch": "CSE",
    "Section": "J"
  },
  {
    "S. No": 58,
    "Name": "KOTA VAISHNAVI",
    "Roll No": "26241A05R1",
    "Branch": "CSE",
    "Section": "J"
  },
  {
    "S. No": 59,
    "Name": "Kurapati Pranav",
    "Roll No": "26241A05R5",
    "Branch": "CSE",
    "Section": "J"
  },
  {
    "S. No": 60,
    "Name": "PALLEPATI HASINI RAO",
    "Roll No": "26241A05RJ",
    "Branch": "CSE",
    "Section": "J"
  },
  {
    "S. No": 61,
    "Name": "Shaik Khasim Moula Vizdania",
    "Roll No": "26241A05RQ",
    "Branch": "CSE",
    "Section": "J"
  },
  {
    "S. No": 62,
    "Name": "Yuva Tej Chintapalli",
    "Roll No": "26241A05RV",
    "Branch": "CSE",
    "Section": "J"
  },
  {
    "S. No": 63,
    "Name": "Jalda Mrunal sai",
    "Roll No": "26241A05S2",
    "Branch": "CSE",
    "Section": "J"
  },
  {
    "S. No": 64,
    "Name": "D.Akshitha reddy",
    "Roll No": "26241A6610",
    "Branch": "AIML",
    "Section": "A"
  },
  {
    "S. No": 65,
    "Name": "Karupakula Neha",
    "Roll No": "26241A6621",
    "Branch": "AIML",
    "Section": "A"
  },
  {
    "S. No": 66,
    "Name": "MADA.SPOORTHI REDDY",
    "Roll No": "26241a6634",
    "Branch": "AIML",
    "Section": "A"
  },
  {
    "S. No": 67,
    "Name": "Mutukundu Jyotsna Reddy",
    "Roll No": "26241A6648",
    "Branch": "AIML",
    "Section": "A"
  },
  {
    "S. No": 68,
    "Name": "Vanipenta Kaushik Reddy",
    "Roll No": "26241A6665",
    "Branch": "AIML",
    "Section": "A"
  },
  {
    "S. No": 69,
    "Name": "AALURI SRUTHI",
    "Roll No": "26241A6666",
    "Branch": "AIML",
    "Section": "B"
  },
  {
    "S. No": 70,
    "Name": "Anushree Bhattad",
    "Roll No": "26241A6674",
    "Branch": "AIML",
    "Section": "B"
  },
  {
    "S. No": 71,
    "Name": "Gutta Abhigna Veda",
    "Roll No": "26241A6689",
    "Branch": "AIML",
    "Section": "B"
  },
  {
    "S. No": 72,
    "Name": "Nekkanti Sahasra Choudary",
    "Roll No": "26241A66A8",
    "Branch": "AIML",
    "Section": "B"
  },
  {
    "S. No": 73,
    "Name": "Rangu Shiva Krishna Prasad",
    "Roll No": "26241A66AE",
    "Branch": "AIML",
    "Section": "B"
  },
  {
    "S. No": 74,
    "Name": "Wadiyala Mallik Anurod",
    "Roll No": "26241A66AW",
    "Branch": "AIML",
    "Section": "B"
  },
  {
    "S. No": 75,
    "Name": "Sai spoorthi",
    "Roll No": "26241A66B7",
    "Branch": "AIML",
    "Section": "C"
  },
  {
    "S. No": 76,
    "Name": "Javisetty Sai Chaitanya",
    "Roll No": "26241A66BM",
    "Branch": "AIML",
    "Section": "C"
  },
  {
    "S. No": 77,
    "Name": "Stephen Paul",
    "Roll No": "26241A66BP",
    "Branch": "AIML",
    "Section": "C"
  },
  {
    "S. No": 78,
    "Name": "Singam Reddy Ashvitha Reddy",
    "Roll No": "26241A66CM",
    "Branch": "AIML",
    "Section": "C"
  },
  {
    "S. No": 79,
    "Name": "EDUPALLI MAHATI",
    "Roll No": "26241A66DA",
    "Branch": "AIML",
    "Section": "D"
  },
  {
    "S. No": 80,
    "Name": "Madanu Abhishek",
    "Roll No": "26241A66DW",
    "Branch": "AIML",
    "Section": "D"
  },
  {
    "S. No": 81,
    "Name": "MAGULURI SAI SHRUTI",
    "Roll No": "26241A66DX",
    "Branch": "AIML",
    "Section": "D"
  },
  {
    "S. No": 82,
    "Name": "MAKKAPATI SANJANA",
    "Roll No": "26241A66DY",
    "Branch": "AIML",
    "Section": "D"
  },
  {
    "S. No": 83,
    "Name": "Mohammed Affan Hussain",
    "Roll No": "26241A66E2",
    "Branch": "AIML",
    "Section": "D"
  },
  {
    "S. No": 84,
    "Name": "Sai Rithvik Rangineni",
    "Roll No": "26241A66E8",
    "Branch": "AIML",
    "Section": "D"
  },
  {
    "S. No": 85,
    "Name": "Kanchari rakshith",
    "Roll No": "26241A66FM",
    "Branch": "AIML",
    "Section": "E"
  },
  {
    "S. No": 86,
    "Name": "Kushal Krishna Lotti",
    "Roll No": "26241A66FV",
    "Branch": "AIML",
    "Section": "E"
  },
  {
    "S. No": 87,
    "Name": "Aryan Panda",
    "Roll No": "26241A6703",
    "Branch": "CSDS",
    "Section": "A"
  },
  {
    "S. No": 88,
    "Name": "Ladi Pavan santosh sai",
    "Roll No": "26241A6732",
    "Branch": "CSDS",
    "Section": "A"
  },
  {
    "S. No": 89,
    "Name": "Palavalasa Jitendra",
    "Roll No": "26241A6745",
    "Branch": "CSDS",
    "Section": "A"
  },
  {
    "S. No": 90,
    "Name": "Rajaboina Prashasth",
    "Roll No": "26241A6750",
    "Branch": "CSDS",
    "Section": "A"
  },
  {
    "S. No": 91,
    "Name": "Suras Ritvik",
    "Roll No": "26241A6758",
    "Branch": "CSDS",
    "Section": "A"
  },
  {
    "S. No": 92,
    "Name": "Varakala Tanusree",
    "Roll No": "26241A6764",
    "Branch": "CSDS",
    "Section": "A"
  },
  {
    "S. No": 93,
    "Name": "D Karishma",
    "Roll No": "26241A6780",
    "Branch": "CSDS",
    "Section": "B"
  },
  {
    "S. No": 94,
    "Name": "GUNDETI NAGALAXMI PRASANNA",
    "Roll No": "26241A6789",
    "Branch": "CSDS",
    "Section": "B"
  },
  {
    "S. No": 95,
    "Name": "Jangiti Saanvi",
    "Roll No": "26241A6792",
    "Branch": "CSDS",
    "Section": "B"
  },
  {
    "S. No": 96,
    "Name": "Nayini Aasritha Reddy",
    "Roll No": "26241A67AA",
    "Branch": "CSDS",
    "Section": "B"
  },
  {
    "S. No": 97,
    "Name": "THADAKAPALLY NIHAL",
    "Roll No": "26241A67AN",
    "Branch": "CSDS",
    "Section": "B"
  },
  {
    "S. No": 98,
    "Name": "ADDULA SAI BHARATH REDDY",
    "Roll No": "26241A67AY",
    "Branch": "CSDS",
    "Section": "C"
  },
  {
    "S. No": 99,
    "Name": "Arjala Rithvik Reddy",
    "Roll No": "26241A67B3",
    "Branch": "CSDS",
    "Section": "C"
  },
  {
    "S. No": 100,
    "Name": "Abhiram deevi",
    "Roll No": "26241A67BC",
    "Branch": "CSDS",
    "Section": "C"
  },
  {
    "S. No": 101,
    "Name": "Rupesh Roshan Goud",
    "Roll No": "26241A67BH",
    "Branch": "CSDS",
    "Section": "C"
  },
  {
    "S. No": 102,
    "Name": "Guttikonda Nikhil Koushik",
    "Roll No": "26241A67BK",
    "Branch": "CSDS",
    "Section": "C"
  },
  {
    "S. No": 103,
    "Name": "Hasini Gunishetty",
    "Roll No": "26241A67BL",
    "Branch": "CSDS",
    "Section": "C"
  },
  {
    "S. No": 104,
    "Name": "NALLOLA SATHVIKESHWAR",
    "Roll No": "26241A67C5",
    "Branch": "CSDS",
    "Section": "C"
  },
  {
    "S. No": 105,
    "Name": "Sorapalli Yogveer Kaushik",
    "Roll No": "26241A67CJ",
    "Branch": "CSDS",
    "Section": "C"
  },
  {
    "S. No": 106,
    "Name": "MULUKA SHIVANI",
    "Roll No": "26241A67D8",
    "Branch": "CSDS",
    "Section": "D"
  },
  {
    "S. No": 107,
    "Name": "N. Chris Rose",
    "Roll No": "26241A67DB",
    "Branch": "CSDS",
    "Section": "D"
  },
  {
    "S. No": 108,
    "Name": "Rangineni Thanusri",
    "Roll No": "26241A67DF",
    "Branch": "CSDS",
    "Section": "D"
  },
  {
    "S. No": 109,
    "Name": "Manish reddy",
    "Roll No": "26241a3218",
    "Branch": "CSBS",
    "Section": "SS"
  },
  {
    "S. No": 110,
    "Name": "M sindhu",
    "Roll No": "26241A3226",
    "Branch": "CSBS",
    "Section": "SS"
  },
  {
    "S. No": 111,
    "Name": "Meesala Serene Asar",
    "Roll No": "26241A3231",
    "Branch": "CSBS",
    "Section": "SS"
  },
  {
    "S. No": 112,
    "Name": "Padala Sai Maitri Sahithi Reddy",
    "Roll No": "26241A3233",
    "Branch": "CSBS",
    "Section": "SS"
  },
  {
    "S. No": 113,
    "Name": "Punyala Varun Adithya Reddy",
    "Roll No": "26241A3239",
    "Branch": "CSBS",
    "Section": "SS"
  },
  {
    "S. No": 114,
    "Name": "ANCHE AVANIKA",
    "Roll No": "26241a0401",
    "Branch": "ECE",
    "Section": "SS"
  },
  {
    "S. No": 115,
    "Name": "G. Yashwanth Kumar",
    "Roll No": "26241A0420",
    "Branch": "ECE",
    "Section": "SS"
  },
  {
    "S. No": 116,
    "Name": "Guvva Preethi",
    "Roll No": "26241A0423",
    "Branch": "ECE",
    "Section": "SS"
  },
  {
    "S. No": 117,
    "Name": "Krishna Prasad Jena",
    "Roll No": "26241A0434",
    "Branch": "ECE",
    "Section": "SS"
  },
  {
    "S. No": 118,
    "Name": "Aakarsh Ram Purama",
    "Roll No": "26241A0450",
    "Branch": "ECE",
    "Section": "SS"
  },
  {
    "S. No": 119,
    "Name": "Tammineni Sri Balaji",
    "Roll No": "26241A0457",
    "Branch": "ECE",
    "Section": "SS"
  },
  {
    "S. No": 120,
    "Name": "Y.Puneet Chandra",
    "Roll No": "26241A0463",
    "Branch": "ECE",
    "Section": "SS"
  },
  {
    "S. No": 121,
    "Name": "Advaith Jagannath",
    "Roll No": "26241A0201",
    "Branch": "EEE",
    "Section": "SS"
  },
  {
    "S. No": 122,
    "Name": "Endrakanti Sindhuja",
    "Roll No": "26241A0211",
    "Branch": "EEE",
    "Section": "SS"
  },
  {
    "S. No": 123,
    "Name": "Lakshmi Narayana kollapudi",
    "Roll No": "26241A0215",
    "Branch": "EEE",
    "Section": "SS"
  },
  {
    "S. No": 124,
    "Name": "Sayala Nikhil Venkat",
    "Roll No": "26241A0227",
    "Branch": "EEE",
    "Section": "SS"
  },
  {
    "S. No": 125,
    "Name": "Sri Dhruthi Naraparaju",
    "Roll No": "26241A0323",
    "Branch": "MECH",
    "Section": "SS"
  },
  {
    "S. No": 126,
    "Name": "Khagesh raj v",
    "Roll No": "26241A0328",
    "Branch": "MECH",
    "Section": "SS"
  }
]
const GLEC_ROWS = [
  {
    "S.No": 1,
    "Name": "DEEKSHITHA NARRA",
    "Roll No": 245626733017,
    "Branch": "CSE",
    "Section": "A"
  },
  {
    "S.No": 2,
    "Name": "Kadukuntla palani",
    "Roll No": 245626733030,
    "Branch": "CSE",
    "Section": "A"
  },
  {
    "S.No": 3,
    "Name": "Pranav Sai Reddy Muchukota",
    "Roll No": 245626733051,
    "Branch": "CSE",
    "Section": "A"
  },
  {
    "S.No": 4,
    "Name": "Shrimann",
    "Roll No": 245626733055,
    "Branch": "CSE",
    "Section": "A"
  },
  {
    "S.No": 5,
    "Name": "Vanga hasini",
    "Roll No": 245626733063,
    "Branch": "CSE",
    "Section": "A"
  },
  {
    "S.No": 6,
    "Name": "AMBATI ABHIJNA",
    "Roll No": 245626733069,
    "Branch": "CSE",
    "Section": "B"
  },
  {
    "S.No": 7,
    "Name": "Sneha Akshaya balam",
    "Roll No": 245626733073,
    "Branch": "CSE",
    "Section": "B"
  },
  {
    "S.No": 8,
    "Name": "Gollapudi Indira Gayathri",
    "Roll No": 245626733089,
    "Branch": "CSE",
    "Section": "B"
  },
  {
    "S.No": 9,
    "Name": "M.yoshitha",
    "Roll No": 245626733099,
    "Branch": "CSE",
    "Section": "B"
  },
  {
    "S.No": 10,
    "Name": "Ponnana Narasingarao",
    "Roll No": 245626733112,
    "Branch": "CSE",
    "Section": "B"
  },
  {
    "S.No": 11,
    "Name": "YM Vyshali",
    "Roll No": 245626733128,
    "Branch": "CSE",
    "Section": "B"
  },
  {
    "S.No": 12,
    "Name": "Keertana Gumudavelly",
    "Roll No": 245626733146,
    "Branch": "CSE",
    "Section": "C"
  },
  {
    "S.No": 13,
    "Name": "I. Gayathri",
    "Roll No": 245626733148,
    "Branch": "CSE",
    "Section": "C"
  },
  {
    "S.No": 14,
    "Name": "K. Prashanth",
    "Roll No": 245626733151,
    "Branch": "CSE",
    "Section": "C"
  },
  {
    "S.No": 15,
    "Name": "Kalidindi sri krishna sashank varma",
    "Roll No": 245626733153,
    "Branch": "CSE",
    "Section": "C"
  },
  {
    "S.No": 16,
    "Name": "PALUTLA SAI ASRITH",
    "Roll No": 245626733174,
    "Branch": "CSE",
    "Section": "C"
  },
  {
    "S.No": 17,
    "Name": "Thadishetti Aravind",
    "Roll No": 245626733182,
    "Branch": "CSE",
    "Section": "C"
  },
  {
    "S.No": 18,
    "Name": "Banda shashank shekar",
    "Roll No": 245626733198,
    "Branch": "CSE",
    "Section": "D"
  },
  {
    "S.No": 19,
    "Name": "Ch.keerthana",
    "Roll No": 245626733202,
    "Branch": "CSE",
    "Section": "D"
  },
  {
    "S.No": 20,
    "Name": "Akash Gattamaneni",
    "Roll No": 245626733208,
    "Branch": "CSE",
    "Section": "D"
  },
  {
    "S.No": 21,
    "Name": "Mandava Aditya Goud",
    "Roll No": 245626733228,
    "Branch": "CSE",
    "Section": "D"
  },
  {
    "S.No": 22,
    "Name": "PULIGILA SRISHANK",
    "Roll No": 245626733236,
    "Branch": "CSE",
    "Section": "D"
  },
  {
    "S.No": 23,
    "Name": "Rishika sinthre",
    "Roll No": 245626733239,
    "Branch": "CSE",
    "Section": "D"
  },
  {
    "S.No": 24,
    "Name": "S.V.L.SREENIDHI",
    "Roll No": 245626733240,
    "Branch": "CSE",
    "Section": "D"
  },
  {
    "S.No": 25,
    "Name": "Tanmayi sudalagunta",
    "Roll No": 245626733250,
    "Branch": "CSE",
    "Section": "D"
  },
  {
    "S.No": 26,
    "Name": "Veerlapati akanksha",
    "Roll No": 245626733253,
    "Branch": "CSE",
    "Section": "D"
  },
  {
    "S.No": 27,
    "Name": "AMARAPU SAI DINESH",
    "Roll No": 245626733261,
    "Branch": "CSE",
    "Section": "E"
  },
  {
    "S.No": 28,
    "Name": "Neehanth Bollipogu",
    "Roll No": 245626733264,
    "Branch": "CSE",
    "Section": "E"
  },
  {
    "S.No": 29,
    "Name": "Gade sresta reddy",
    "Roll No": 245626733276,
    "Branch": "CSE",
    "Section": "E"
  },
  {
    "S.No": 30,
    "Name": "Godishala Laasya",
    "Roll No": 245626733281,
    "Branch": "CSE",
    "Section": "E"
  },
  {
    "S.No": 31,
    "Name": "Charan gonguguntala",
    "Roll No": 245626733282,
    "Branch": "CSE",
    "Section": "E"
  },
  {
    "S.No": 32,
    "Name": "KOMMINENI REVANTH",
    "Roll No": 245626733293,
    "Branch": "CSE",
    "Section": "E"
  },
  {
    "S.No": 33,
    "Name": "Koppadi Vijay",
    "Roll No": 245626733295,
    "Branch": "CSE",
    "Section": "E"
  },
  {
    "S.No": 34,
    "Name": "Maanaboina Hari thej",
    "Roll No": 245626733297,
    "Branch": "CSE",
    "Section": "E"
  },
  {
    "S.No": 35,
    "Name": "Sontireddy Ashish",
    "Roll No": 245626733414,
    "Branch": "CSE",
    "Section": "E"
  },
  {
    "S.No": 36,
    "Name": "Thati. Vyshnavi",
    "Roll No": 245626733417,
    "Branch": "CSE",
    "Section": "E"
  },
  {
    "S.No": 37,
    "Name": "Sahasra Mamidyala",
    "Roll No": 245626733451,
    "Branch": "CSE",
    "Section": "F"
  },
  {
    "S.No": 38,
    "Name": "Nelluri abhinav chowdary",
    "Roll No": 245626733457,
    "Branch": "CSE",
    "Section": "F"
  },
  {
    "S.No": 39,
    "Name": "Hasini Samudrala",
    "Roll No": 245626733471,
    "Branch": "CSE",
    "Section": "F"
  },
  {
    "S.No": 40,
    "Name": "Chava Sri Lakshmi Unnathi",
    "Roll No": 245626748014,
    "Branch": "AIML",
    "Section": "A"
  },
  {
    "S.No": 41,
    "Name": "Dhanush Naidu Veera",
    "Roll No": 245626748021,
    "Branch": "AIML",
    "Section": "A"
  },
  {
    "S.No": 42,
    "Name": "Gullakota Bhagyasree",
    "Roll No": 245626748030,
    "Branch": "AIML",
    "Section": "A"
  },
  {
    "S.No": 43,
    "Name": "LAHARI KASANAGOTTU",
    "Roll No": 245626748037,
    "Branch": "AIML",
    "Section": "A"
  },
  {
    "S.No": 44,
    "Name": "Kuppireddy Medhaswi Reddy",
    "Roll No": 245626748039,
    "Branch": "AIML",
    "Section": "A"
  },
  {
    "S.No": 45,
    "Name": "P. SAI DEEPTHI",
    "Roll No": 245626748049,
    "Branch": "AIML",
    "Section": "A"
  },
  {
    "S.No": 46,
    "Name": "Achyuth sai",
    "Roll No": 245626748059,
    "Branch": "AIML",
    "Section": "A"
  },
  {
    "S.No": 47,
    "Name": "Timmareddygari Charan Kumar Reddy",
    "Roll No": 245626748064,
    "Branch": "AIML",
    "Section": "A"
  },
  {
    "S.No": 48,
    "Name": "B. Premkumar",
    "Roll No": 245626748071,
    "Branch": "AIML",
    "Section": "B"
  },
  {
    "S.No": 49,
    "Name": "Dhulipudi Vinay Sanjay Ram",
    "Roll No": 245626748075,
    "Branch": "AIML",
    "Section": "B"
  },
  {
    "S.No": 50,
    "Name": "Juluri Krishna Manohar",
    "Roll No": 245626748086,
    "Branch": "AIML",
    "Section": "B"
  },
  {
    "S.No": 51,
    "Name": "KOYA CHARITH",
    "Roll No": 245626748096,
    "Branch": "AIML",
    "Section": "B"
  },
  {
    "S.No": 52,
    "Name": "Madanu Ashwitha Mary",
    "Roll No": 245626748100,
    "Branch": "AIML",
    "Section": "B"
  },
  {
    "S.No": 53,
    "Name": "Nammi Havish",
    "Roll No": 245626748108,
    "Branch": "AIML",
    "Section": "B"
  },
  {
    "S.No": 54,
    "Name": "Sai Dhanush Mittapally",
    "Roll No": 245626748118,
    "Branch": "AIML",
    "Section": "B"
  },
  {
    "S.No": 55,
    "Name": "Tadi Manasa Reddy",
    "Roll No": 245626748124,
    "Branch": "AIML",
    "Section": "B"
  }
] 

const getRowData = (row, index) => ({
  sNo: row['S.No'] ?? row.sNo ?? row.rank ?? index + 1,
  name: row['Name'] ?? row.name ?? '',
  rollNo: String(row['Roll No'] ?? row.rollNo ?? ''),
  branch: row['Branch'] ?? row.branch ?? '',
  section: row['Section'] ?? row.section ?? '',
  score: row['Score'] ?? row.score ?? row['Score Percentage'] ?? null,
})

const selectOptions = (rows, key1, key2) =>
  [...new Set(rows.map((row) => row[key1] ?? (key2 ? row[key2] : undefined)).filter(Boolean))].sort()

export default function Results2026() {
  const [selectedCollege, setSelectedCollege] = useState('GRIET')
  const [query, setQuery] = useState('')
  const [branch, setBranch] = useState('all')
  const [section, setSection] = useState('all')
  const [sortOrder, setSortOrder] = useState('sno-asc')
  const [rowLimit, setRowLimit] = useState('50')
  const [page, setPage] = useState(1)

  const currentCollegeRows = selectedCollege === 'GRIET' ? GRIET_ROWS : GLEC_ROWS
  const hasScore = currentCollegeRows.some((row) => getRowData(row, 0).score !== null)

  const branches = useMemo(() => selectOptions(currentCollegeRows, 'Branch', 'branch'), [currentCollegeRows])
  const sections = useMemo(() => selectOptions(currentCollegeRows, 'Section', 'section'), [currentCollegeRows])

  const results = useMemo(() => {
    const term = query.trim().toLowerCase()
    return currentCollegeRows
      .filter((rawRow, idx) => {
        const row = getRowData(rawRow, idx)
        const matchesText =
          !term ||
          [row.name, row.rollNo, row.branch, row.section].some((val) =>
            val.toLowerCase().includes(term)
          )
        return (
          matchesText &&
          (branch === 'all' || row.branch === branch) &&
          (section === 'all' || row.section === section)
        )
      })
      .sort((rawA, rawB) => {
        const a = getRowData(rawA, 0)
        const b = getRowData(rawB, 0)
        switch (sortOrder) {
          case 'sno-desc':
            return b.sNo - a.sNo
          case 'name-asc':
            return a.name.localeCompare(b.name)
          case 'name-desc':
            return b.name.localeCompare(a.name)
          case 'score-desc':
            return (b.score ?? 0) - (a.score ?? 0) || a.sNo - b.sNo
          case 'score-asc':
            return (a.score ?? 0) - (b.score ?? 0) || a.sNo - b.sNo
          case 'sno-asc':
          default:
            return a.sNo - b.sNo
        }
      })
  }, [currentCollegeRows, query, branch, section, sortOrder])

  const limit = rowLimit === 'all' ? results.length || 1 : Number(rowLimit)
  const totalPages = Math.max(1, Math.ceil(results.length / limit))
  const currentPage = Math.min(page, totalPages)
  const firstResult = results.length ? (currentPage - 1) * limit : 0
  const visibleResults = results.slice(firstResult, firstResult + limit)
  const lastResult = Math.min(firstResult + limit, results.length)

  const resetPage = (setter) => (event) => {
    setter(event.target.value)
    setPage(1)
  }

  const handleCollegeChange = (collegeName) => {
    if (collegeName === selectedCollege) return
    setSelectedCollege(collegeName)
    setBranch('all')
    setSection('all')
    setQuery('')
    setPage(1)
  }

  const clearFilters = () => {
    setQuery('')
    setBranch('all')
    setSection('all')
    setSortOrder('sno-asc')
    setPage(1)
  }

  const hasFilters = query || branch !== 'all' || section !== 'all' || sortOrder !== 'sno-asc'

  return (
    <div className="results-page">
      <div className="aurora aurora-one" />
      <div className="aurora aurora-two" />
      <header className="header">
        <Link href="/" className="back" aria-label="Back to Home">
          <FaArrowLeft aria-hidden="true" /> 
        </Link>
        <div className="eyebrow">
          <i /> AAC Entrance Exam 2026 · RESULTS
        </div>
        <h1>
          Recruitments <em>2026</em>
        </h1>
        <p>
          Explore the Recruitments shortlisted candidates across GRIET and GLEC.
          Toggle your college or search a student below.
        </p>
      </header>

      <main>
        <div className="college-toggle-wrap">
          <div className="college-toggle" role="tablist" aria-label="Select college">
            <button
              type="button"
              role="tab"
              aria-selected={selectedCollege === 'GRIET'}
              className={`toggle-btn ${selectedCollege === 'GRIET' ? 'active' : ''}`}
              onClick={() => handleCollegeChange('GRIET')}
            >
              GRIET
              {GRIET_ROWS.length > 0 && <span className="count-pill">{GRIET_ROWS.length}</span>}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={selectedCollege === 'GLEC'}
              className={`toggle-btn ${selectedCollege === 'GLEC' ? 'active' : ''}`}
              onClick={() => handleCollegeChange('GLEC')}
            >
              GLEC
              <span className="count-pill">{GLEC_ROWS.length}</span>
            </button>
          </div>
        </div>

        <section className="panel" aria-label="Search and filters">
          <div className="search">
            <span>⌕</span>
            <input
              autoFocus
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
                setPage(1)
              }}
              placeholder={`Find your result by entering your name, roll number, branch, or section...`}
              aria-label="Search results"
            />
          </div>

          <div className="filters">
            <label>
              Branch
              <select value={branch} onChange={resetPage(setBranch)}>
                <option value="all">All branches</option>
                {branches.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Section
              <select value={section} onChange={resetPage(setSection)}>
                <option value="all">All sections</option>
                {sections.map((item) => (
                  <option key={item} value={item}>
                    Section {item}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Sort by
              <select value={sortOrder} onChange={resetPage(setSortOrder)}>
                <option value="sno-asc">S.No (Ascending)</option>
                <option value="sno-desc">S.No (Descending)</option>
                <option value="name-asc">Name (A–Z)</option>
                <option value="name-desc">Name (Z–A)</option>
                {hasScore && (
                  <>
                    <option value="score-desc">Highest score first</option>
                    <option value="score-asc">Lowest score first</option>
                  </>
                )}
              </select>
            </label>

            <label>
              Rows per page
              <select value={rowLimit} onChange={resetPage(setRowLimit)} aria-label="Rows per page">
                <option value="50">50 rows</option>
                <option value="100">100 rows</option>
                <option value="all">All rows</option>
              </select>
            </label>

            <button className="clear" onClick={clearFilters} disabled={!hasFilters}>
              Clear filters
            </button>
          </div>
        </section>

        {currentCollegeRows.length === 0 ? (
          <section className="empty review-state">
            <div className="review-icon">⏳</div>
            <h2>{selectedCollege} Results Under Review</h2>
            <p>
              The recruitment results for {selectedCollege} are currently undergoing review.
              Please check back soon!
            </p>
            <button type="button" className="switch-cta" onClick={() => handleCollegeChange('GLEC')}>
              View GLEC Results ({GLEC_ROWS.length})
            </button>
          </section>
        ) : (
          <>
            <div className="table-meta">
              <span>
                Showing <b>{results.length ? `${firstResult + 1}–${lastResult}` : '0'}</b> of{' '}
                {results.length} participants in <b>{selectedCollege}</b>
              </span>
              <span>Shortlisted candidates list</span>
            </div>

            {results.length ? (
              <>
                <section className="table-wrap" aria-live="polite">
                  <table>
                    <thead>
                      <tr>
                        <th style={{ width: '85px' }}>S.No</th>
                        <th>Student Name</th>
                        <th>Roll Number</th>
                        <th>Branch</th>
                        <th>Section</th>
                        {hasScore && <th>Score</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {visibleResults.map((rawRow, index) => {
                        const row = getRowData(rawRow, firstResult + index)
                        return (
                          <tr key={`${selectedCollege}-${row.rollNo}-${firstResult + index}`}>
                            <td data-label="S.No">
                              <b className="sno-badge">#{row.sNo}</b>
                            </td>
                            <td data-label="Student" className="name">
                              {row.name}
                            </td>
                            <td data-label="Roll number" className="roll">
                              {row.rollNo}
                            </td>
                            <td data-label="Branch">
                              <span className="branch-tag">{row.branch}</span>
                            </td>
                            <td data-label="Section">{row.section}</td>
                            {hasScore && (
                              <td data-label="Score">
                                <strong className="score">
                                  {row.score !== null ? `${row.score}%` : '—'}
                                </strong>
                              </td>
                            )}
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </section>

                <nav className="pagination" aria-label="Results pagination">
                  <button
                    type="button"
                    onClick={() => setPage((val) => Math.max(1, val - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <span>
                    Page <b>{currentPage}</b> of <b>{totalPages}</b>
                  </span>
                  <button
                    type="button"
                    onClick={() => setPage((val) => Math.min(totalPages, val + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </nav>
              </>
            ) : (
              <section className="empty">
                <div>⌕</div>
                <h2>No students found</h2>
                <p>Try adjusting your search query or resetting your active branch/section filters.</p>
                <button onClick={clearFilters}>Clear filters</button>
              </section>
            )}
          </>
        )}
      </main>

      <footer>© 2026 AAC · Opulence · Recruitment Portal</footer>

      <style jsx>{`
        .results-page {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          background: #0e1421;
          color: #f8fafc;
          padding: 24px 20px 0;
          font-family: var(--font-sans, Arial, sans-serif);
        }
        .results-page:before {
          content: '';
          position: fixed;
          inset: 0;
          pointer-events: none;
          opacity: 0.32;
          background-image: radial-gradient(rgba(255, 255, 255, 0.12) 0.6px, transparent 0.6px);
          background-size: 5px 5px;
          mask-image: linear-gradient(#000, transparent);
        }
        .aurora {
          position: fixed;
          width: 45rem;
          height: 27rem;
          filter: blur(90px);
          opacity: 0.18;
          pointer-events: none;
          border-radius: 50%;
        }
        .aurora-one {
          background: #3b82f6;
          top: -17rem;
          right: -10rem;
        }
        .aurora-two {
          background: #6366f1;
          bottom: 5rem;
          left: -20rem;
        }
        .header,
        main,
        footer {
          position: relative;
          z-index: 1;
        }
        .header {
          max-width: 1120px;
          margin: 0 auto;
          padding: 36px 0 24px;
          text-align: center;
        }
        .back {
          position: absolute;
          left: 0;
          top: 8px;
          display: inline-flex;
          gap: 9px;
          align-items: center;
          color: #fff;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          padding: 10px 14px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 50px;
          background: rgba(15, 23, 42, 0.5);
          backdrop-filter: blur(12px);
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
        }
        .back:hover,
        .back:focus-visible {
          background: rgba(59, 130, 246, 0.2);
          border-color: rgba(147, 197, 253, 0.65);
          transform: translateY(-1px);
          outline: none;
        }
        .eyebrow {
          color: #93c5fd;
          font-weight: 800;
          font-size: 11px;
          letter-spacing: 0.16em;
        }
        .eyebrow i {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #60a5fa;
          margin: 0 7px 1px 0;
          box-shadow: 0 0 12px #60a5fa;
        }
        .header h1 {
          font-size: clamp(42px, 7vw, 76px);
          line-height: 1;
          margin: 12px 0 13px;
          letter-spacing: -0.06em;
        }
        .header em {
          font-style: normal;
          background: linear-gradient(120deg, #60a5fa, #818cf8);
          -webkit-background-clip: text;
          color: transparent;
        }
        .header p {
          max-width: 620px;
          margin: auto;
          color: #a9b6c8;
          font-size: 15px;
          line-height: 1.65;
        }
        main {
          max-width: 1120px;
          margin: auto;
        }

        /* College Toggle */
        .college-toggle-wrap {
          display: flex;
          justify-content: center;
          margin: 0 auto 18px;
        }
        .college-toggle {
          display: inline-flex;
          align-items: center;
          background: rgba(3, 10, 23, 0.7);
          padding: 5px;
          border-radius: 9999px;
          border: 1px solid rgba(96, 165, 250, 0.25);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
          gap: 6px;
          backdrop-filter: blur(12px);
        }
        .toggle-btn {
          border: 0;
          outline: none;
          background: transparent;
          color: #94a3b8;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.06em;
          padding: 9px 28px;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);
          display: inline-flex;
          align-items: center;
          gap: 9px;
        }
        .toggle-btn:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.08);
        }
        .toggle-btn.active {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: #ffffff;
          box-shadow: 0 4px 16px rgba(59, 130, 246, 0.45);
        }
        .count-pill {
          font-size: 11px;
          background: rgba(255, 255, 255, 0.24);
          color: #ffffff;
          padding: 2px 7px;
          border-radius: 9999px;
          font-weight: 800;
        }
        .toggle-btn:not(.active) .count-pill {
          background: rgba(255, 255, 255, 0.1);
          color: #94a3b8;
        }

        .panel,
        .table-wrap,
        .empty {
          background: rgba(14, 27, 47, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.11);
          box-shadow: 0 16px 45px rgba(0, 0, 0, 0.19);
          backdrop-filter: blur(12px);
          border-radius: 16px;
        }
        .panel {
          padding: 16px;
          margin-bottom: 18px;
        }
        .search {
          height: 52px;
          border: 1px solid rgba(96, 165, 250, 0.48);
          display: flex;
          align-items: center;
          padding: 0 16px;
          background: rgba(3, 10, 23, 0.5);
          border-radius: 12px;
          transition: box-shadow 0.2s, border-color 0.2s;
        }
        .search:focus-within {
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
          border-color: #60a5fa;
        }
        .search span {
          font-size: 24px;
          color: #93c5fd;
          margin-right: 12px;
        }
        .search input {
          min-width: 0;
          width: 100%;
          border: 0;
          outline: 0;
          background: transparent;
          color: #ffffff;
          font-size: 15px;
        }
        .search input::placeholder {
          color: #728198;
        }

        .filters {
          display: grid;
          grid-template-columns: repeat(4, 1fr) auto;
          gap: 12px;
          margin-top: 14px;
        }
        .filters label {
          font-size: 11px;
          color: #aab7c8;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 600;
        }
        .filters select {
          display: block;
          width: 100%;
          margin-top: 5px;
          background: #0b1729;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 8px;
          color: #fff;
          padding: 9px 12px;
          font-size: 13px;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .filters select:focus {
          border-color: #93c5fd;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.18);
        }
        .clear,
        .empty button {
          align-self: end;
          background: transparent;
          border: 1px solid rgba(96, 165, 250, 0.58);
          border-radius: 8px;
          color: #93c5fd;
          padding: 10px 16px;
          cursor: pointer;
          font-weight: 700;
          font-size: 13px;
          transition: all 0.2s;
        }
        .clear:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }
        .clear:not(:disabled):hover,
        .empty button:hover {
          background: #3b82f6;
          color: #07101f;
        }

        .table-meta {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          color: #a9b6c8;
          font-size: 13px;
          margin: 14px 4px 10px;
        }
        .table-meta b {
          color: #fff;
        }

        .table-wrap {
          overflow: auto;
          border-radius: 16px;
        }
        .table-wrap table {
          width: 100%;
          border-collapse: collapse;
          min-width: 680px;
        }
        .table-wrap th {
          text-align: left;
          padding: 14px 18px;
          background: rgba(0, 0, 0, 0.25);
          color: #94a3b8;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.11em;
          font-weight: 700;
        }
        .table-wrap td {
          padding: 15px 18px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 13.5px;
          color: #d8e1ed;
        }
        .table-wrap tr:hover td {
          background: rgba(59, 130, 246, 0.075);
        }

        .sno-badge {
          color: #93c5fd;
          font-family: monospace;
          font-size: 13px;
        }
        .name {
          font-weight: 700;
          color: #fff !important;
        }
        .roll {
          font-family: monospace;
          color: #9fb0c9 !important;
          letter-spacing: 0.04em;
        }
        .branch-tag {
          display: inline-block;
          padding: 3px 9px;
          border-radius: 6px;
          background: rgba(59, 130, 246, 0.14);
          border: 1px solid rgba(96, 165, 250, 0.25);
          color: #93c5fd;
          font-size: 11px;
          font-weight: 700;
        }
        .score {
          color: #38bdf8;
          font-size: 14px;
        }

        .empty {
          text-align: center;
          padding: 60px 20px;
        }
        .empty div {
          font-size: 40px;
          color: #93c5fd;
        }
        .empty h2 {
          margin: 10px 0 6px;
          font-size: 22px;
        }
        .empty p {
          color: #a9b6c8;
          max-width: 460px;
          margin: 0 auto;
          line-height: 1.5;
        }
        .empty button {
          margin-top: 16px;
        }

        .review-state .review-icon {
          font-size: 46px;
          margin-bottom: 8px;
        }
        .switch-cta {
          margin-top: 18px !important;
          background: #2563eb !important;
          color: #fff !important;
          border-color: #3b82f6 !important;
          padding: 11px 22px !important;
        }
        .switch-cta:hover {
          background: #1d4ed8 !important;
        }

        .pagination {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          margin: 20px 0 4px;
          color: #cbd5e1;
          font-size: 13px;
        }
        .pagination button {
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(96, 165, 250, 0.58);
          border-radius: 8px;
          color: #93c5fd;
          padding: 9px 16px;
          cursor: pointer;
          font-weight: 700;
          transition: background 0.2s, color 0.2s;
        }
        .pagination button:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .pagination button:not(:disabled):hover {
          background: #2563eb;
          color: #fff;
        }

        footer {
          text-align: center;
          color: #64748b;
          border-top: 1px solid rgba(96, 165, 250, 0.2);
          margin-top: 48px;
          padding: 24px;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        @media (max-width: 760px) {
          .results-page {
            padding: 15px 12px 0;
          }
          .header {
            padding-top: 55px;
            text-align: left;
          }
          .back {
            top: 8px;
          }
          .header p {
            margin: 0;
          }
          .filters {
            grid-template-columns: 1fr 1fr;
          }
          .clear {
            grid-column: span 2;
          }
          .table-meta {
            display: block;
            line-height: 1.7;
          }
          .table-meta span:last-child {
            display: none;
          }
          .table-wrap {
            background: transparent;
            border: 0;
            box-shadow: none;
            overflow: visible;
          }
          .table-wrap table,
          .table-wrap tbody,
          .table-wrap tr,
          .table-wrap td {
            display: block;
            min-width: 0;
          }
          .table-wrap thead {
            display: none;
          }
          .table-wrap tr {
            position: relative;
            background: rgba(14, 27, 47, 0.78);
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 14px 14px 10px;
            margin-bottom: 10px;
            border-radius: 14px;
          }
          .table-wrap td {
            border: 0;
            padding: 5px 0 5px 95px;
            min-height: 24px;
            font-size: 13px;
          }
          .table-wrap td:before {
            content: attr(data-label);
            position: absolute;
            left: 14px;
            color: #8797ad;
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 0.08em;
          }
          .table-wrap td.name {
            padding-left: 95px;
            font-size: 14.5px;
          }
          .table-wrap td:first-child {
            position: absolute;
            right: 14px;
            top: 12px;
            padding: 0;
            min-height: 0;
          }
          .table-wrap td:first-child:before {
            display: none;
          }
          .table-wrap tr:hover td {
            background: none;
          }
          .pagination {
            justify-content: space-between;
            gap: 8px;
          }
          .pagination button {
            padding: 9px 12px;
          }
        }
      `}</style>
    </div>
  )
}
  