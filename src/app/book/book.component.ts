import { Component, OnInit, HostListener, OnChanges, SimpleChanges } from '@angular/core';
import { title } from 'process';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  host: {
    '(document:keypress)': 'handleKeyboardEvent($event)'
  }
})
export class BookComponent implements OnInit, OnChanges {

  page: number = 1;
  bookmarkPage: number;
  book: any = {
    id: 1,
    name: 'SDLC Project Management',
    page: 576
  }
  two_page = true;

  constructor(private titleService: Title) { 
    this.titleService.setTitle(this.book.name)
  }

  ngOnInit(): void {


    this.getBookmark();
    this.page = this.bookmarkPage;
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return 'p' + Math.round(value / 1000);
    }

    return value;

  }

  subSize() {

  }

  addSize() {

  }

  set1page() {
    this.two_page = false;
  }

  set2pages() {

    this.two_page = true;
  }

  nextPage() {
    if (this.page < this.book.page) {
      ++this.page;
      if (this.two_page) {
        ++this.page;
      }
    }
  }

  backPage() {
    if (this.page > 1) {
      --this.page;
      if (this.two_page) {
        --this.page;
      }
    }
  }

  openFullscreen() {
    const elem = document.getElementById('book-view');
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(e: KeyboardEvent) {
    if (e.keyCode === 13 || e.keyCode === 39) {
      this.nextPage();
      e.preventDefault();
    }
    else if (e.keyCode == 37) {
      this.backPage();
      e.preventDefault();
    }
  }

  bookmark() {
    let data: any = localStorage.getItem('bookmarks');
    let bookmarks = data ? JSON.parse(data) : []
    const bookmarkIndex = bookmarks.findIndex(b => b.id = this.book.id);
    if (bookmarks.length === 0 || bookmarkIndex === -1) {
      bookmarks.push({ id: this.book.id, page: this.page });
    } else {
      bookmarks[bookmarkIndex].page = this.page;
      this.bookmarkPage = this.page;
    }

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  getBookmark() {
    let data: any = localStorage.getItem('bookmarks');
    let bookmarks = data ? JSON.parse(data) : [];
    const bookmarkIndex = bookmarks.findIndex(b => b.id = this.book.id);
    if (bookmarkIndex > -1) {
      this.bookmarkPage = bookmarks[bookmarkIndex].page;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.page) {
      document.querySelector('book-view').scrollTo(0, 0)
    }
  }

}
