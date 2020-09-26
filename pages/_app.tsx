import { AppProps } from 'next/app';
import { NextPage } from 'next';
import { wrapper } from '../store';
import '../mobile-menu.scss';
import '../styles.scss';
import '../theme.scss';
import '../variable.scss';
import "react-multi-carousel/lib/styles.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../public/css/header.scss';
import '../public/css/headermenu.scss';
import '../public/css/footer.scss';
import '../public/css/footermenu.scss';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

// fontawesome.library.add(regular)
// fontawesome.library.add(solid)
// fontawesome.library.add(brands)
const MyApp: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default wrapper.withRedux(MyApp);
