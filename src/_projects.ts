import { List } from './types'

const projects = [{
  label: 'Top Projects',
  items: [{
    title: 'foldMation',
    img: '/imgs/thumb/fold-bird.png',
    imgHt: 200,
    path: '/post/foldmation',
    date: '2023-11-20',
    text: 'A new Innovative way to bring Origami Fold Creation and Learning online',
  }, {
    title: 'aiGames.ink',
    img: '/imgs/thumb/aigames.svg',
    imgHt: 180,
    path: '/post/aigames',
    date: '2021-01-21',
    text: 'A platform for running AI Games. First is a strong AlphaZero implementation of Othello.',
  }, {
    title: 'Mation Spec',
    path: '/post/mation-spec',
    img: '/imgs/thumb/mation-spec.png',
    imgHt: 180, // hard to read if 170
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
    img: '/imgs/thumb/doc-based-coding.png',
    date: '2018-02-25',
    text: 'Interactive Code Learning via Document-flow tutorials and Q/A',
  }, {
    title: 'Data Explorer',
    path: '/post/data-explorer',
    img: '/imgs/thumb/dataExplorer.png',
    text: "A Mind Map Data Exploration Tool to help navigate user's data and relationships",
    date: '2016-02-14',
  }, {
    title: 'Genome Sequencing with Seq',
    path: '/post/seq-genomics',
    img: '/imgs/thumb/seq-eg.png',
    imgHt: 200,
    date: '2020-03-24',
    text: 'Solutions for Coursera Bioinformatics / Stepik Genome Sequencing course using Seq',
  }, {
    title: 'Self Driving Car Coursework',
    path: '/post/self-driving-car-coursework',
    img: '/imgs/thumb/p5.png',
    date: '2018-02-13',
    imgHt: 170,
    text: 'Self Driving Car Udacity Coursework',
  }, {
    title: 'Youtube Preview Screen Generator',
    path: '/post/youtube-preview-screen-generator',
    img: '/imgs/thumb/video-utils.jpg',
    imgHt: 190,
    date: '2015-08-15',
    text: 'Video preview sceen creation script',
  }, {
    title: 'Presentations',
    path: '/talks/',
    img: '/imgs/thumb/vis.png',
    imgHt: 200,
    date: '2017-08-11',
    text: 'Slides from my past Tech Presentations; Made with Remark.js, open sourced',
  }, {
    title: 'Functional Advent of Code',
    path: '/post/functional-aoc',
    img: '/imgs/thumb/AoC.png',
    imgHt: 210,
    date: '2019-06-09',
    text: 'Solving Advent of Code to experiment with Functional Languages',
  }, {
    title: 'Simple Physics Engine',
    path: '/post/simple-physics-engine',
    img: '/imgs/thumb/spe.png',
    imgHt: 190,
    date: '2011-07-24',
    text: 'A Simple 2D Physics Engine in Javascript with no dependencies',
  }],
}] as List[]
export default projects