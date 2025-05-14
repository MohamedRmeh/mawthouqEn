'use client';
import { usePathname } from 'next/navigation';

const useLanguage = () => {
  const locale = usePathname(); // الحصول على اللغة الحالية
    // console.log(locale)
  return locale 
};

export default useLanguage;
