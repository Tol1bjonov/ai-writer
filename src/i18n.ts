import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import detector from 'i18next-browser-languagedetector'

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
   en: {
      dashboard: {
         title: 'Title',
         titleHint: 'Please, provide a title for your content',
         description: 'Description',
         descriptionHint: 'Please, provide a description for your content!',

         descriptPlaceholder:
            'Write about ReactJS form validation. Provide a real life examples.',
         generate: 'Generate',
         profile: 'Profile',
         logout: 'Logout',
      },
   },
   uz: {
      dashboard: {
         title: 'Sarlavha',
         titleHint: 'Iltimos kontent uchun sarlavha kiriting',
         description: 'Tavsifi',
         descriptionHint: 'Iltimos kontent tavsifini yozing!',

         descriptPlaceholder:
            'RectJSda form validatsiyasi haqida yozing. Amaliy misollar taqdim eting.',
         generate: 'Yaratish',
         profile: 'Sahifa',
         logout: 'Chiqish',
      },
   },
}

i18n
   .use(detector)
   .use(initReactI18next) // passes i18n down to react-i18next
   .init({
      resources, // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
      // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
      // if you're using a language detector, do not define the lng option

      interpolation: {
         escapeValue: false, // react already safes from xss
      },
      fallbackling: 'en',
      detection: {
         order: ['localStorage'],
      },
   })

export default i18n
