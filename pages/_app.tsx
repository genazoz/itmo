import type {AppProps} from 'next/app'
import {NextIntlProvider} from 'next-intl';
import {Router, useRouter} from "next/router";
import Head from "next/head";
import {useEffect} from "react";
import {ThemeProvider} from "styled-components";
import nProgress from "nprogress";

import '/public/fonts/fonts.sass'
import GlobalStyles from "../styles/GlobalStyles";
import theme from "../styles/theme";
import {wrapper} from "../app/store";
import {setLoading} from "../features/settings/settingsSlice";
import {useAppDispatch} from "../app/hooks";
import Header from "../components/Header";
import Transition from '../components/Transition';

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

function MyApp({Component, pageProps}: AppProps) {
  const router = useRouter()
  const dispatch = useAppDispatch();

  useEffect(() => {
    const start = () => {
      dispatch(setLoading(true));
    };
    const end = () => {
      dispatch(setLoading(false));
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);


  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Itmo News</title>
      </Head>
      <GlobalStyles/>
      <Header/>
      <NextIntlProvider messages={pageProps.messages}>
        <Transition location={router.pathname}>
          <Component {...pageProps} />
        </Transition>
      </NextIntlProvider>
    </ThemeProvider>
  )
}

export default wrapper.withRedux(MyApp);
