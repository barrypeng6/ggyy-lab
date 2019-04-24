import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
	static getInitialProps({ renderPage }) {
		const sheet = new ServerStyleSheet();
		const page = renderPage(App => props =>
			sheet.collectStyles(<App {...props} />),
		);
		const styleTags = sheet.getStyleElement();
		return { ...page, styleTags };
	}

	render() {
		return (
			<Html>
				<Head>
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					{this.props.styleTags}
					<link
						rel="stylesheet"
						href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
						integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
						crossorigin="anonymous"
					/>
					<link
						href="https://fonts.googleapis.com/css?family=Roboto"
						rel="stylesheet"
					/>
					<style>{`
						html,
						body,
						#__next {
							height: 100%;
							margin: 0
						}
					`}</style>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
