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
      tooltipText: ' Study In Japan',
      image:
        'https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/uk/whyStudy.jpg',
      title: 'Why Study  ',
      colorText: 'in Japan ?',
      description:
        'Japan is home to some of the world’s most prestigious universities. Institutions like Oxford, Cambridge, Sorbonne, and ETH Zurich offer education at the highest standards, and degrees from these universities are highly regarded worldwide.',
      quickFactsTitle: 'Quick Facts',
      quickFacts: [
        { id: 1, text: 'Free student counseling available' },
        { id: 2, text: 'High visa success rate' },
        { id: 3, text: 'Personalized one-on-one guidance' },
        { id: 4, text: 'Safe country with unique culture' },
        { id: 4, text: 'Part-time work allowed (up to 28 hours/week)' },
        { id: 4, text: 'Fast visa processing' },
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
        'In Japan, tuition fees vary based on the state, the university funding model, and the student’s country of origin. So, listing an average is a rather difficult task. However, thanks to the folks at College Board, they’ve rendered an estimate of last year’saverage tuition costs, which will roughly reflect the next few years.',
      quickFactsTitle: 'Quick Facts',
      quickFacts: [
        { id: 1, text: 'Total Expenses: €4715 (BDT-6,83,675)' },
        { id: 2, text: 'Tuition Fees for one-year (Indicative): € 300 (BDT-43,500)' },
        { id: 3, text: 'Living and Accommodation: € 4000 (BDT-5,80,000)' },
        { id: 4, text: 'Airfare from Bangladesh to Japan: € 340 (BDT-49,300)' },
        { id: 5, text: 'Visa Fees: € 75 (BDT-10,875)' }
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
        "Japan is known for its vibrant economy and high standards of education, making it an appealing destination for international students. The country's thriving industries include Information Technology, Financial Services, Pharmaceuticals, and Healthcare. Top career opportunities for international graduates in Japan include roles in Software Development, Financial Analysis, Project Management, and Engineering. Europe's strong economy, coupled with a high quality of life, offers a supportive environment for professional growth. Additionally, Ireland is recognized for its high standard of living, strong job market, and emphasis on work-life balance."
    }
  ]

  const glanceData = [
    {
      id: 1,
      factor: 'Average tuition fees (per year)',
      value: [
        "Vocational or Diploma courses - €300 (BDT-43,500 approximately)",
        "Bachelor's degree - €300 (BDT-43,500 approximately)",
        "Master's degree - €300 (BDT-43,500 approximately)",
        "MS - €300–€28,000 (BDT-43,500- 40,60,000 approximately)",
        "Ph.D. - €300–€30,000 (BDT-43,500- 43,50,000approximately)",
      ]
    },
    {
      id: 2,
      factor: 'Eligibility criteria',
      value: [
        "Entrance qualification",
        'Transcript of grades',
        'Proof of language proficiency',
        'English language proficiency test',
        'IELTS Academic test',
        'TOEFL iBT',
        'PTE Academic',
        'ID or valid passport copies',
        'Letter of motivation (optional)',
        'The Japanese-Language Proficiency Test (JLPT)',
      ]
    },
    {
      id: 3,
      factor: 'Test score requirements',
      value: [
        'GDS - Goethe-Zertifikat C2',
        'GRE - 315 and above',
        'GMAT - 550 and above',
        'IELTS - 5.5 and above',
        'TOEFL - 60–80'
      ]
    },
    {
      id: 4,
      factor: 'Top courses offered',
      value: ['Engineering', 'Management', 'Computer Science and IT', 'Creative Arts', 'Humanities and Arts', 'Social Sciences']
    },
    {
      id: 5,
      factor: 'Student visa fees',
      value: [
        '€ 75 (BDT-10,875)'
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
      title: 'How much of a gap is accepted for study in the Japan?',
      description:
        'The gap accepted to study in the Japan depends on the level of education a candidate is pursuing. Typically, a gap of up to 2 years is acceptable for undergraduate programs, whereas a gap of almost 5 years is accepted for candidates aspiring to study for a postgraduate degree in the Japan.'
    },
    {
      title: 'How much money is required to study in the Japan?',
      description:
        'Tuition fees for international students vary depending on the university and the chosen course. On average, undergraduate and postgraduate tuition fees for international students range from GBP 10,000 to GBP 40,000 per year, while living expenses are approximately GBP 5,700 per year.'
    },
    {
      title: 'How to get a scholarship to study in the Japan?',
      description:
        'A plethora of funding options is available to study in the Japan. Candidates must check the official websites of Japan universities and educational institutions, as well as government and private organizations, for scholarship opportunities. Widely, a tremendous academic record can help candidates in securing scholarships in the Japan.'
    },
    {
      title: 'How to study in the Japan from Bangladesh?',
      description:
        'From researching for a course to arranging for accommodation, candidates need to follow key steps as listed below to study in the Japan. Selecting a course and university Meeting the admission requirements to get an acceptance letterAttaining a student visa to stay and study in the JapanLearning about pre and post-departure processes'
    }
  ]

  return (
    <div>
      <div>
        <Banner
          colorText='Study In'
          text='Japan'
          url={
            'https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/uk/ukbanner.png'
          }
          des='Japan is home to some of the world’s most prestigious universities. Institutions like Oxford, Cambridge, Sorbonne, and ETH Zurich offer education at the highest standards, and degrees from these universities are highly regarded worldwide.'
        />
      </div>
      <ApplicationProcess />
      <WhyStudy studyAbroadData={studyAbroadData} />
      <Careers careersData={careersData} />
      <PopularUniversities universities={universities} />
      <EducationCost educationCostData={educationCostData} />
      <AtAGlance glanceData={glanceData} colorText='Japan' />
      {/* <StudentSpeaks /> */}
      <Testimonial />
      <FaqArea
        faqsData={faqsData}
        countryName='Japan'
        des='Studying in the Japan can offer a variety of benefits, making it an attractive destination for international students. Here are some reasons why study in Japan is a popular choice.'
      />
      <BlogList />
    </div>
  )
}
