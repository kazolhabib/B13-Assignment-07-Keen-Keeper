import Link from 'next/link';
import Image from 'next/image';
import instagramIcon from '@/assets/instagram.png';
import facebookIcon from '@/assets/facebook.png';
import twitterIcon from '@/assets/twitter.png';
import footerLogo from '@/assets/KeenKeeper.png';

export default function Footer() {
  return (
    <footer className="bg-[#244D3F] text-white pt-12 lg:pt-20 pb-8 px-6 md:px-12 w-full mt-auto">
      <div className="max-w-[1110px] mx-auto flex flex-col items-center justify-center text-center">
        {/* Logo */}
        <Image src={footerLogo} alt="KeenKeeper Logo" className="w-50 md:w-72 lg:w-[412px] h-auto mb-6" />
        
        
        <p className="text-[rgba(255,255,255,0.8)] text-base mb-6">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>

        
        <h3 className="text-xl font-medium mb-4">Social Links</h3>
        
       
        <div className="flex space-x-3 mb-10">
          <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors">
            <Image src={instagramIcon} alt="Instagram" className="w-[20px] h-[20px]" />
          </a>
          <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors">
            <Image src={facebookIcon} alt="Facebook" className="w-[20px] h-[20px]" />
          </a>
          <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors">
            <Image src={twitterIcon} alt="Twitter" className="w-[20px] h-[20px]" />
          </a>
        </div>

        {/* Footer line */}
        <div className='w-full h-[1px] bg-[rgba(26,136,97,0.2)]'></div>

        
        <div className="w-full flex flex-col md:flex-row justify-between items-center text-xs text-[rgba(250,250,250,0.5)] pt-8">
          <p className="mb-4 md:mb-0 text-sm md:text-base font-normal text-[rgba(250,250,250,0.5)]">© 2026 KeenKeeper. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="#" className="text-sm md:text-base font-normal text-[rgba(250,250,250,0.5)] hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-sm md:text-base font-normal text-[rgba(250,250,250,0.5)] hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="text-sm md:text-base font-normal text-[rgba(250,250,250,0.5)] hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
