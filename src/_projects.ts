import { List } from './types'

const projects = [{
  label: 'Showcase Projects',
  items: [{
    title: 'foldMation',
    img: '/imgs/thumbs/fold-bird.png',
    path: '/post/foldmation',
    date: '2023-11-20',
    text: 'A new Innovative way to bring Origami Fold Creation and Learning online',
  }, {
    title: 'aiGames.ink',
    img: '/imgs/thumbs/aigames.svg',
    path: '/post/aigames',
    date: '2021-01-21',
    text: 'A platform for running AI Games. First is a strong AlphaZero implementation of Othello.',
  }, {
    title: 'Mation Spec',
    path: '/post/mation-spec',
    img: '/imgs/thumbs/mation-spec.png',
    date: '2021-05-25',
    text: 'A Readable Configuration Specification Format for Automation and Task Runners',
  // }, {
  //   title: 'Portfolio / Blog Generator',
  //   path: '/post/portfolio-blog-creator',
  //   text: 'Portfolio/Blog Generator with Typescript and Vite',
  // }, {
  //   title: 'Billion Dollar Charting',
  //   path: '/post/billion-dollar-charting',
  //   date: '2022-02-22',
  //   text: 'Trading View-like Realtime Stock Charting and Management',
  }]
}, {
  label: 'Other Projects',
  items: [{
    title: 'Document Based Code Learning',
    path: '/post/document-based-code-learning',
    img: '/imgs/thumbs/doc-based-coding.png',
    date: '2018-02-25',
    text: 'Interactive Code Learning via Document-flow tutorials and Q/A',
  }, {
    title: 'Data Explorer',
    path: '/post/data-explorer',
    img: '/imgs/thumbs/dataExplorer.png',
    text: "A Mind Map Data Exploration Tool to help navigate user's data and relationships",
    date: '2018-02-14',
  }, {
    title: 'Genome Sequencing with Seq',
    path: '/post/seq-genomics',
    img: '/imgs/thumbs/seq-eg.png',
    text: 'Solutions for Coursera Bioinformatics / Stepik Genome Sequencing course using Seq',
  }, {
    title: 'Self Driving Car Coursework',
    path: '/post/self-driving-car-coursework',
    img: '/imgs/thumbs/p5.png',
    text: 'Self Driving Car Udacity Coursework',
  }, {
    title: 'Youtube Preview Screen Generator',
    path: '/post/youtube-preview-generator',
    img: '/imgs/thumbs/video-utils.jpg',
    text: 'Youtube or Video preview sceen creation script (bypass the need to embed an iframe)',
  }, {
    title: 'Presentations',
    path: '/talks/',
    img: '/imgs/thumbs/vis.png',
    text: 'Slides from my past Tech Presentations; Made with Remark.js, open sourced',
  }, {
    title: 'Functional Advent of Code',
    path: '/post/functional-aoc',
    img: '/imgs/thumbs/AoC.png',
    text: 'Solving Advent of Code to experiment with Functional Languages',
  }, {
    title: 'Simple Physics Engine',
    path: '/post/simple-physics-engine',
    img: '/imgs/thumbs/spe.png',
    text: 'A Simple 2D Physics Engine in Javascript with no dependencies',
    date: '2011-07-24',
  }],
}] as List[]
export default projects