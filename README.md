# CodeViewer Component

CodeViewer is a lightweight, customizable web component that makes it easy to display beautifully formatted code snippets on your website. It uses Shadow DOM to encapsulate styles, ensuring that the component will not conflict with the rest of your page.

<p align="center">
  <img src="https://github.com/t-montes/code-viewer/assets/69558777/afd53b38-11e1-4832-9b76-3a7440396eb8">
</p>


## Getting Started

To use CodeViewer in your project, follow these steps:

1. Include the `highlight.js` library and the `code-viewer.js` file in your HTML file:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/highlight.min.js"></script>
<script type="module" src="https://cdn.jsdelivr.net/gh/t-montes/code-viewer@master/code-viewer.js"></script>
```

2. Use the `code-viewer` tag in your HTML to display code snippets:

```html
<code-viewer title="main.js">
    console.log("Hello World!");
    // more code here
</code-viewer>
```

## Features

- Syntax highlighting via Highlight.js
- Customizable appearance through attributes such as `title` and `font-size`
- Automatic indentation handling for cleaner code display
- Copy-to-clipboard functionality for code snippets

## Usage

You can customize the appearance and behavior of the CodeViewer component using the following attributes:

- `title`: Sets the title of the code snippet, which is displayed in the header bar.
- `font-size`: Adjusts the font size of the code within the viewer.

Example with custom title and font size:

```html
<code-viewer title="main.dart" font-size="1.2rem">
    // code here
</code-viewer>
```

To style the component globally, you can target the `code-viewer` element in your CSS:

```css
code-viewer {
    /* styles here */
}
```

![image](https://github.com/t-montes/code-viewer/assets/69558777/624de96e-9d75-4431-a685-41997be2537c)

## Contributing

Contributions are what makes the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the [MIT License](LICENSE). See `LICENSE` for more information.

## Acknowledgments

* [Highlight.js](https://highlightjs.org/) for the syntax highlighting functionality.
* All the developers and contributors who work on open-source projects.
* The web development community for their continual feedback and support.
