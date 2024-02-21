import {type ClassValue, clsx} from 'clsx'
import {twMerge} from 'tailwind-merge'
import {ChatMessagesType} from '@/components/custom/global/chat-tab';
import {MessageType} from '@/components/custom/global/one-on-one-chat';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalizeWords(input: string) {
  return input.replace(/(^|\s)\S/g, function (match) {
    return match.toUpperCase();
  });
}

export function formatAddress(inputAddress: string): string {
  // Split the input address into an array of words
  const words = inputAddress.split(/\s+/);

  // Find the index of "województwo"
  const wojewodztwoIndex = words.indexOf('województwo');

  // If "województwo" is found, eliminate everything after it
  const filteredWords = wojewodztwoIndex !== -1 ? words.slice(0, wojewodztwoIndex) : words;

  // Join the remaining words back into a string
  console.log(filteredWords.join(' '));
  return filteredWords.join(' ');
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}
export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const seconds = Math.floor(Math.abs(diffMs) / 1000);
  const minutes = Math.floor(seconds / 60) - 60;
  const hours = Math.floor(minutes / 60) - 1;
  const days = Math.floor(hours / 24);
  console.log(dateString, diffMs,`Seconds ${ seconds}`, `Mins ${  minutes}`, `Hours: ${hours}`, `Days: ${days}`)

  if (diffMs < 0) {
    // Past dates
    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
    if(hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
    if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    }
    else {
      return 'just now';
    }
  } else if (diffMs === 0) {
    return 'just now';
  } else {
    // Future dates
    if (days > 0) {
      return `in ${days} day${days > 1 ? 's' : ''}`;
    } else if (hours > 0) {
      return `in ${hours} hour${hours > 1 ? 's' : ''}`;
    } else if (minutes > 0) {
      return `in ${minutes} minute${minutes > 1 ? 's' : ''}`;
    } else {
      return 'just now';
    }
  }
}

export function chatDate(inputDate: string): string {
  const date = new Date(inputDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}-${month} ${hours}:${minutes}`;
}

export function sortByTimestampOldestToNewest(elements: MessageType[]): MessageType[] {
  // Convert the date strings to JavaScript Date objects for proper sorting
  const parsedElements = elements.map((element) => ({
    ...element,
    timestamp: new Date(element.messageTime),
  }));

  // Sort the elements based on the timestamp property
  parsedElements.sort((a, b) => parseInt(a.messageTime) - parseInt(b.messageTime));

  // Convert the Date objects back to strings
  const sortedElements = parsedElements.map((element) => ({
    ...element,
    timestamp: element.timestamp.toISOString(), // Adjust the format as needed
  }));

  return sortedElements;
}
