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

export default function page () {
  const studyAbroadData = [
    {
      id: 1,
      tooltipText: ' Study In Canada',
      image:
        'https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/uk/whyStudy.jpg',
      title: 'Why Study  ',
      colorText: 'in Canada ?',
      description:
        'Canada is home to some of the world’s most prestigious universities. Institutions like Oxford, Cambridge, Sorbonne, and ETH Zurich offer education at the highest standards, and degrees from these universities are highly regarded worldwide.',
      quickFactsTitle: 'Quick Facts',
      quickFacts: [
        { id: 1, text: 'Free student counseling available' },
        { id: 2, text: 'High visa success rate' },
        { id: 3, text: 'Personalized one-on-one guidance ' },
        { id: 4, text: 'Top-ranked universities' },
        { id: 4, text: 'Post-study work permit up to 3 years' },
        { id: 4, text: 'PR opportunities after study' },
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
        'In Canada, tuition fees vary based on the state, the university funding model, and the student’s country of origin. So, listing an average is a rather difficult task. However, thanks to the folks at College Board, they’ve rendered an estimate of last year’saverage tuition costs, which will roughly reflect the next few years.',
      quickFactsTitle: 'Quick Facts',
      quickFacts: [
        { id: 1, text: 'Total Expenses: 26,150 CAD (BDT-23,53,500)' },
        { id: 2, text: 'Tuition Fees for one-year (Indicative):10000 CAD (BDT-9,00,000)' },
        { id: 3, text: 'Living and Accommodation:15000 CAD (BDT-13,50,000)' },
        { id: 4, text: 'Airfare from Bangladesh to Canada: CAD 1000 (BDT-90,000)' },
        { id: 5, text: 'Visa Fees: CAD 150 (BDT-13,500)' }
      ]
    }
  ]

  const careersData = [
    {
      id: 1,
      tooltipText: ' Careers',
      image:
        'https://pub-5955669eccb64965b91474a798f31ae3.r2Canada/carrers.jpg',
      title: 'Careers ',
      colorText: '& Industry',
      description:
        "Canada is known for its vibrant economy and high standards of education, making it an appealing destination for international students. The country's thriving industries include Information Technology, Financial Services, Pharmaceuticals, and Healthcare. Top career opportunities for international graduates in Canada include roles in Software Development, Financial Analysis, Project Management, and Engineering. Europe's strong economy, coupled with a high quality of life, offers a supportive environment for professional growth. Additionally, Ireland is recognized for its high standard of living, strong job market, and emphasis on work-life balance."
    }
  ]

  const glanceData = [
    {
      id: 1,
      factor: 'Average tuition fees (per year)',
      value: [
        "Bachelor's degree - CAD 12,000–CAD 30,000 (BDT-10,80,000- 27,00,000) approximately",
        "Master's degree - CAD 18,000–CAD 57,000 (BDT-16,20,000-51,30,000) approximately",
        'Ph.D. - CAD 4,100–CAD 20,000 (BDT-3,69,000-18,00,000) approximately'
      ]
    },
    {
      id: 2,
      factor: 'Duration',
      value: [
        "Bachelor's degree - 3–4 years",
        "Master's degree - 3–4 years",
        'Ph.D. - 4–6 years'
      ]
    },
    {
      id: 3,
      factor: 'Eligibility criteria',
      value: [
        "Academic credentials - High school completion, Bachelor's degree, or Master's degree in related fields of study",
        'Documents - Passport, Study permit, SOP, LOR, etc.',
        'Test scores - GMAT, GRE, IELTS, TOEFL, PTE, DET, etc.'
      ]
    },
    {
      id: 4,
      factor: 'Test score requirements',
      value: [
        'GRE - 300+',
        'GMAT - 550+',
        'IELTS - 6.0+',
        'TOEFL - 90+',
        'DET - 105+'
      ]
    },
    {
      id: 5,
      factor: 'Popular courses',
      value: ['Biology', 'Engineering', 'Agricultural Science & Forestry', 'Business Management',]
    },
    {
      id: 6,
      factor: 'Study permit fees',
      value: [
        'CAD 150 (BDT-13,500)'
      ]
    }
  ]

  const universities = [
    {
      img: 'https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/uk/versity/warwick.jpg',
      name: 'University of Warwick'
    },
    {
      img: 'https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/uk/versity/Imperial%20College%20London.jpg',
      name: 'Imperial College London'
    },
    {
      img: 'https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/uk/versity/London%20School%20of%20Economics%20and%20Political%C2%A0Science.jpg',
      name: 'London School of Economics and Political Science '
    },
    {
      img: 'https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/uk/versity/Durham%20University.jpg',
      name: 'Durham University'
    },
    {
      img: 'https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/uk/versity/University%20of%20Bristol.jpg',
      name: 'University of Bristol'
    },
    {
      img: 'https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/uk/versity/University%20of%20Cambridge.jpg',
      name: 'University of Cambridge'
    },
    {
      img: 'https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/uk/versity/University%20of%20Hull.jpg',
      name: 'University of Hull'
    },
    {
      img: 'https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/uk/versity/University%20of%20Edinburgh.jpg',
      name: 'University of Edinburgh'
    },
    {
      img: 'https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/uk/versity/University%20of%20Oxford.jpg',
      name: 'University of Oxford'
    }
  ]

  const faqsData = [
    {
      title: 'How much of a gap is accepted for study in the Canada?',
      description:
        'The gap accepted to study in the Canada depends on the level of education a candidate is pursuing. Typically, a gap of up to 2 years is acceptable for undergraduate programs, whereas a gap of almost 5 years is accepted for candidates aspiring to study for a postgraduate degree in the Canada.'
    },
    {
      title: 'How much money is required to study in the Canada?',
      description:
        'Tuition fees for international students vary depending on the university and the chosen course. On average, undergraduate and postgraduate tuition fees for international students range from GBP 10,000 to GBP 40,000 per year, while living expenses are approximately GBP 5,700 per year.'
    },
    {
      title: 'How to get a scholarship to study in the Canada?',
      description:
        'A plethora of funding options is available to study in the Canada. Candidates must check the official websites of Canada universities and educational institutions, as well as government and private organizations, for scholarship opportunities. Widely, a tremendous academic record can help candidates in securing scholarships in the Canada.'
    },
    {
      title: 'How to study in the Canada from Bangladesh?',
      description:
        'From researching for a course to arranging for accommodation, candidates need to follow key steps as listed below to study in the Canada. Selecting a course and university Meeting the admission requirements to get an acceptance letterAttaining a student visa to stay and study in the CanadaLearning about pre and post-departure processes'
    }
  ]

  return (
    <div>
      <div>
        <Banner
          colorText='Study In'
          text='Canada'
          url={
            'https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/uk/ukbanner.png'
          }
          des='Canada is home to some of the world’s most prestigious universities. Institutions like Oxford, Cambridge, Sorbonne, and ETH Zurich offer education at the highest standards, and degrees from these universities are highly regarded worldwide.'
        />
      </div>
      <ApplicationProcess />
      <WhyStudy studyAbroadData={studyAbroadData} />
      <Careers careersData={careersData} />
      <PopularUniversities universities={universities} />
      <EducationCost educationCostData={educationCostData} />
      <AtAGlance glanceData={glanceData} colorText='Canada' />
      {/* <StudentSpeaks /> */}
      <Testimonial />
      <FaqArea
        faqsData={faqsData}
        countryName='Canada'
        des='Studying in the Canada can offer a variety of benefits, making it an attractive destination for international students. Here are some reasons why study in Canada is a popular choice.'
      />
      <BlogList />
    </div>
  )
}
