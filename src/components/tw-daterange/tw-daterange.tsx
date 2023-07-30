'use client';
import { Component, Event, EventEmitter, Prop, State, h } from '@stencil/core';
import { add, format, getDaysInMonth, isSameDay, isWithinInterval, startOfMonth, sub } from 'date-fns';
import { DateRange } from './types';

@Component({
  tag: 'tw-daterange',
  styleUrl: 'tw-daterange.css',
  shadow: true,
})
export class DateRangePicker {
  /**
   * Event emitted when the date range is updated
   */
  @Event() update: EventEmitter<DateRange>;

  /**
   * Initial date range (start and end date object)
   */
  @Prop()
  initialRange?: DateRange;

  /**
   * Whether the date range picker is open or not
   */
  @Prop()
  isOpen?: boolean = true;

  @State() currMonth: Date = startOfMonth(new Date());
  @State() dateRange: DateRange = {
    startDate: this.initialRange?.startDate ?? new Date(),
    endDate: this.initialRange?.endDate ?? add(new Date(), { days: 20 }),
  };

  days: string[] = [];

  componentWillLoad() {
    this.generateDayWeek();
  }

  generateDayWeek() {
    const userLocale = navigator.language || 'en-US';
    const days = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date(2023, 0, i);
      let dayName = new Intl.DateTimeFormat(userLocale, { weekday: 'short' }).format(day);
      dayName = dayName.replace(/./, c => c.toUpperCase());
      days.push(dayName);
    }

    this.days = days;
  }

  generateCalendar(date: Date) {
    const startOfMonthDate = startOfMonth(date);
    const daysInMonth = getDaysInMonth(startOfMonthDate);
    const startDayOfWeek = startOfMonthDate.getDay();

    const calendar = Array.from({ length: 42 }, (_, dayIndex) => {
      const calendarDay = dayIndex - startDayOfWeek + 1;
      if (calendarDay <= 0 || calendarDay > daysInMonth) {
        return null;
      }
      return calendarDay;
    });

    return calendar;
  }

  isBetween(date: Date, { startDate, endDate }: DateRange) {
    if (!startDate || !endDate) {
      return false;
    }
    return isWithinInterval(date, { start: startDate, end: endDate });
  }

  updateDateRange(date: Date) {
    if (!this.dateRange.startDate) {
      this.dateRange = { ...this.dateRange, startDate: date };
    } else if (this.dateRange.startDate && !this.dateRange.endDate) {
      if (date.getTime() < this.dateRange.startDate.getTime()) {
        this.dateRange = { startDate: date, endDate: this.dateRange.startDate };
      } else {
        this.dateRange = { ...this.dateRange, endDate: date };
      }
    } else if (this.dateRange.startDate && this.dateRange.endDate) {
      this.dateRange = { startDate: date, endDate: null };
    }

    if (this.dateRange.startDate && this.dateRange.endDate) {
      this.update.emit(this.dateRange);
    }
  }

  renderMonthView(month: Date) {
    const calendar = this.generateCalendar(month);

    return (
      <div class="drop-shadow-sm shadow-sm min-w-[10rem] p-3 rounded-lg border border-r-0 flex flex-col h-full">
        <div class="flex justify-between items-center">
          <h3 class="text-lg">
            {format(month, 'MMMM')} {month.getFullYear()}
          </h3>
          <div class="flex gap-x-2 items-center">
            <button
              type="button"
              class="p-2 rounded-lg hover:bg-gray-300 border drop-shadow-sm"
              onClick={() => {
                this.currMonth = sub(this.currMonth, { months: 1 });
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width={1.5} stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              type="button"
              class="p-2 rounded-lg hover:bg-gray-300 border drop-shadow-sm"
              onClick={() => {
                this.currMonth = add(this.currMonth, { months: 1 });
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width={1.5} stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
        <div class="grid grid-cols-7 p-3 gap-2 mt-3">
          {this.days.map(day => (
            <div class="text-center w-12">{day}</div>
          ))}
        </div>
        <div class="grid grid-cols-7 p-3 gap-2">
          {calendar.map(day => {
            if (day === null) return <span></span>; // Skip rendering for null days
            const currDate = new Date(month.getFullYear(), month.getMonth(), day);
            const isInRange = this.isBetween(currDate, this.dateRange);
            const isSelected = isSameDay(currDate, this.dateRange.startDate) || isSameDay(currDate, this.dateRange.endDate);
            return (
              <button
                type="button"
                class={`rounded-lg border flex w-12 justify-center p-2 hover:bg-blue-600 hover:text-white ${isSelected ? 'bg-blue-600 text-white' : ''} ${
                  isInRange ? 'bg-blue-200' : ''
                }`}
                onClick={() => {
                  this.updateDateRange(currDate);
                }}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  render() {
    if (!this.isOpen) return null;
    return (
      <div class="flex flex-col md:flex-row md:justify-start md:items-start justify-center items-center gap-x-12 md:gap-x-0 h-">
        {this.renderMonthView(this.currMonth)}
        <div class="hidden md:block">{this.renderMonthView(add(this.currMonth, { months: 1 }))}</div>
      </div>
    );
  }
}
