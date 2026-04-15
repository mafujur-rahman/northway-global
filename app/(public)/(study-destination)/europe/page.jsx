import Banner from "../../_components/Banner/Banner"
import BlogList from "../../_components/Blogs/Blogs"
import StudentSpeaks from "../../_components/StudentSpeaks/StudentSpeaks"
import ApplicationProcess from "../../_components/StudyDestinationCmp/ApplicationProcess/ApplicationProcess"
import Careers from "../../_components/StudyDestinationCmp/Careers/Careers"
import EducationCost from "../../_components/StudyDestinationCmp/EducationCost/EducationCost"
import FaqArea from "../../_components/StudyDestinationCmp/FaqArea/FaqArea"
import AtAGlance from "../../_components/StudyDestinationCmp/Glance/Glance"
import PopularUniversities from "../../_components/StudyDestinationCmp/PopularUniversities/PopularUniversities"
import WhyStudy from "../../_components/StudyDestinationCmp/WhyStudy/WhyStudy"
import Testimonial from "../../_components/Testimonial/Testimonial"

export default function page() {
  const studyAbroadData = [
    {
      id: 1,
      tooltipText: ' Study In Europe',
      image:
        'https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/uk/whyStudy.jpg',
      title: 'Why Study  ',
      colorText: 'in Europe ?',
      description:
        'Studying in Europe offers a unique combination of academic excellence, cultural diversity, and global career opportunities. Here are the key reasons why students choose Europe. Many European countries such as Germany and Norway offer low or even no tuition fees at public universities, making it a cost-effective option for international students. Europe allows easy travel between countries within the Schengen Zone. Students can explore multiple cultures, languages, and lifestyles during their studies.',
      quickFactsTitle: 'Quick Facts',
      quickFacts: [
        { id: 1, text: 'Free student counseling available' },
        { id: 2, text: 'High visa success rate ' },
        { id: 3, text: 'Personalized one-on-one guidance' },
        { id: 4, text: 'High-quality education & global recognition' },
        { id: 4, text: 'Part-time work opportunities' },
        { id: 4, text: 'Easy travel across Schengen countries' },
        { id: 4, text: 'Many countries offer low or no tuition fees' },
      ]
    }
  ]
  const educationCostData = [
    {
      id: 1,
      tooltipText: 'Education Cost',
      image:
        'https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/usa/cost.webp',
      title: 'Cost of ',
      colorText: 'Education',
      description:
        'In the Europe, tuition fees vary based on the country, the university funding model, and the student’s country of origin. So, listing an average is a rather difficult task. However, thanks to the folks at College Board, they’ve rendered an estimate of last year’s average tuition costs, which will roughly reflect the next few years.',
      quickFactsTitle: 'Quick Facts',
      quickFacts: [
        { id: 1, text: 'Total Expenses: € 22,698 (BDT-32,91,210)' },
        { id: 2, text: 'Tuition Fees for one-year (Indicative): €5,000 (BDT-7,25,000 approximately)' },
        { id: 3, text: 'Living and Accommodation: €12,000 (BDT-17,40,000)' },
        { id: 4, text: 'Airfare from Bangladesh to Europe: € 598 (BDT-86,710)' },
        { id: 5, text: 'Visa Fees: €100 (BDT-14,500) (Based on the country)' }
      ]
    }
  ]

  const careersData = [
    {
      id: 1,
      tooltipText: ' Careers',
      image:
        'https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/uk/carrers.jpg',
      title: 'Careers ',
      colorText: '& Industry',
      description:
        ["Europe is known for its strong and diverse economy, as well as its high standards of education, making it an attractive destination for international students. The region’s thriving industries include Information Technology, Engineering, Automotive, Finance, Healthcare, and Renewable Energy. Top career opportunities for international graduates in Europe include roles in Software Development, Data Analysis, Engineering, Business Management, and Research.",

          "Countries such as Germany, Netherlands, and Sweden are known for their strong job markets and innovation-driven economies, offering excellent career prospects for graduates. Europe’s combination of economic stability, advanced infrastructure, and high quality of life creates a supportive environment for both personal and professional growth.",

          "Additionally, Europe is recognized for its cultural diversity, work-life balance, and opportunities to travel across multiple countries, making it an enriching experience for international students."

        ]
    }
  ]

  const glanceData = [
    {
      id: 1,
      factor: 'Average tuition fees (per year)',
      value: [
        "Bachelor's degree - €5,000–€25,000 (BDT-7,25,000-36,25,000 approximately)",
        "Master's degree - €5,000–€35,000 (BDT-7,25,000-50,75,000 approximately)",
        'Ph.D. - €7,000–€35,000 (BDT-10,15,000-50,75,000 approximately)'
      ]
    },
    {
      id: 2,
      factor: 'Eligibility criteria',
      value: [
        "Completed application form",
        'Academic transcripts',
        'Proof of English language proficiency',
        'Proof of Identity',
        'Curriculum Vitae (CV)/Resume',
        '2 letters of recommendation',
        'SOP/Personal statement',
        'Financial proof',
        'Student visa',
      ]
    },
    {
      id: 3,
      factor: 'Test score requirements',
      value: [
        'PTE - 60-65',
        'IELTS - 6.5+ above',
        'TOEFL IBT - 80-100',
      ]
    },
    {
      id: 4,
      factor: 'Popular courses',
      value: ['Agricultural Sciences', 'Biology and Biochemistry', 'Information and Computer Technology', 'Clinical Medicine', 'Economics and Business', 'Electrical and Electronic Engineering', 'Arts and Humanities', 'Social Sciences and Public Health', 'Space Science', 'Psychiatry and Psychology']
    },
    {
      id: 5,
      factor: 'Student visa fees',
      value: [
        'Visa Fees: €100 (BDT-14,500) (Based on the country)'
      ]
    }
  ]

  const countries = [
  {
    img: 'https://flagcdn.com/w320/es.png',
    name: 'Spain'
  },
  {
    img: 'https://flagcdn.com/w320/fr.png',
    name: 'France'
  },
  {
    img: 'https://flagcdn.com/w320/mt.png',
    name: 'Malta'
  },
  {
    img: 'https://flagcdn.com/w320/hu.png',
    name: 'Hungary'
  },
  {
    img: 'https://flagcdn.com/w320/lt.png',
    name: 'Lithuania'
  },
  {
    img: 'https://flagcdn.com/w320/pl.png',
    name: 'Poland'
  },
  {
    img: 'https://flagcdn.com/w320/se.png',
    name: 'Sweden'
  },
  {
    img: 'https://flagcdn.com/w320/dk.png',
    name: 'Denmark'
  },
  {
    img: 'https://flagcdn.com/w320/fi.png',
    name: 'Finland'
  },
  {
    img: 'https://flagcdn.com/w320/cy.png',
    name: 'Cyprus'
  },
  {
    img: 'https://flagcdn.com/w320/it.png',
    name: 'Italy'
  },
  {
    img: 'https://flagcdn.com/w320/bg.png',
    name: 'Bulgaria'
  }
];
  const faqsData = [
    {
      title: 'How much of a gap is accepted for study in the Europe?',
      description:
        'The gap accepted to study in the Europe depends on the level of education a candidate is pursuing. Typically, a gap of up to 2 years is acceptable for undergraduate programs, whereas a gap of almost 5 years is accepted for candidates aspiring to study for a postgraduate degree in the Europe.'
    },
    {
      title: 'How much money is required to study in the Europe?',
      description:
        'Tuition fees for international students vary depending on the university and the chosen course. On average, undergraduate and postgraduate tuition fees for international students range from GBP 10,000 to GBP 40,000 per year, while living expenses are approximately GBP 5,700 per year.'
    },
    {
      title: 'How to get a scholarship to study in the Europe?',
      description:
        'A plethora of funding options is available to study in the Europe. Candidates must check the official websites of Europe universities and educational institutions, as well as government and private organizations, for scholarship opportunities. Widely, a tremendous academic record can help candidates in securing scholarships in the Europe.'
    },
    {
      title: 'How to study in the Europe from Bangladesh?',
      description:
        'From researching for a course to arranging for accommodation, candidates need to follow key steps as listed below to study in the Europe. Selecting a course and university Meeting the admission requirements to get an acceptance letterAttaining a student visa to stay and study in the EuropeLearning about pre and post-departure processes'
    }
  ]

  return (
    <div>
      <div>
        <Banner
          colorText='Study In'
          text='Europe'
          url={
            'https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/uk/ukbanner.png'
          }
          des='Europe is one of the most popular study destinations for international students, offering world-class education, diverse cultures, and globally recognized degrees. With a rich academic heritage and modern teaching methods, Europe provides the perfect environment for both academic and personal growth.'
        />
      </div>
      <ApplicationProcess />
      <WhyStudy studyAbroadData={studyAbroadData} />
      <Careers careersData={careersData} />
      <PopularUniversities countries={countries} />
      <EducationCost educationCostData={educationCostData} />
      <AtAGlance glanceData={glanceData} colorText='Europe' />
      {/* <StudentSpeaks /> */}
      <Testimonial />
      <FaqArea
        faqsData={faqsData}
        countryName='Europe'
        des='Studying in the Europe can offer a variety of benefits, making it an attractive destination for international students. Here are some reasons why study in Europe is a popular choice.'
      />
      <BlogList />
    </div>
  )
}
