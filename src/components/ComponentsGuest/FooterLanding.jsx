import facebookIcon from "../../assets/icons/facebook.png";
import instagramIcon from "../../assets/icons/instagram.png";
import twitterIcon from "../../assets/icons/twitter.png";

export default function FooterLanding() {
  return (
    <footer className="bg-[#03061f] text-white py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        <div>
          <h3 className="font-bold text-lg mb-2">Obatology</h3>
          <p className="text-gray-400">
            Solusi cerdas untuk kebutuhan kesehatan Anda. Aman, cepat, dan
            terpercaya.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Navigasi</h4>
          <ul className="space-y-1">
            <li>
              <a href="#promo" className="hover:text-cyan-400">
                Promo
              </a>
            </li>
            <li>
              <a href="#products" className="hover:text-cyan-400">
                Produk
              </a>
            </li>
            <li>
              <a href="#whyus" className="hover:text-cyan-400">
                Kenapa Kami
              </a>
            </li>
            <li>
              <a href="#testimonials" className="hover:text-cyan-400">
                Testimoni
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Ikuti Kami</h4>
          <div className="flex space-x-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center rounded-full  hover:bg-cyan-600 transition"
            >
              <img src={instagramIcon} alt="Instagram" className="w-11 h-7" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center rounded-full  hover:bg-cyan-600 transition"
            >
              <img src={twitterIcon} alt="Twitter" className="w-11 h-8.5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center rounded-full  hover:bg-cyan-600 transition"
            >
              <img src={facebookIcon} alt="Facebook" className="w-6 h-6" />
            </a>
          </div>
        </div>

        <div id="kontak">
          <h4 className="font-semibold mb-2">Kontak Klinik</h4>
          <ul className="text-gray-400 space-y-1">
            <li>📍 Jl. Kesehatan No. 10, Pekanbaru</li>
            <li>📞 (0761) 123-456</li>
            <li>✉️ info@obatology.id</li>
            <li>🕒 Senin - Sabtu, 08.00 - 17.00</li>
          </ul>
        </div>
      </div>

      <div className="text-center text-gray-500 mt-10 text-xs">
        &copy; {new Date().getFullYear()} Obatology. Hak cipta dilindungi.
      </div>
    </footer>
  );
}
