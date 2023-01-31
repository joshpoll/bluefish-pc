/* 
Van Panhuis W., Cross A., Burke D., Counts of Acute poliomyelitis reported in UNITED STATES OF AMERICA: 1912-1971: (version 2.0, April 1, 2018): Project Tycho data release, DOI: 10.25337/T7/ptycho.v2.0/US.398102009
*/

/* 
generated with the following tidyjs code and observable notebook code:

https://observablehq.com/@observablehq/input-file

data = csvfile.csv({typed: true})

tidy(
  data,
  mutate({ year: (d) => d.PeriodStartDate.getFullYear(), state: (d) => d.state.substring(3) }),
  filter((d) => d.year >= 1950 && d.year < 1960),
  groupBy(['state', 'year'], [summarize({ total: sum('CountValue') })]),
);

ok... it's not _really_ a state, but it's a state code (includes DC and PR)
*/

/* 

group polio data by state, then create a bar chart out of it

map over all the states and place a bar chart centered at the centroid of the state
- keep a map of the state->centroid

*/

export type PolioData = {
  state: string;
  year: number;
  total: number;
};

export const polio_data: PolioData[] = [
  { state: 'WI', year: 1950, total: 944 },
  { state: 'WI', year: 1951, total: 1375 },
  { state: 'WI', year: 1952, total: 2318 },
  { state: 'WI', year: 1953, total: 855 },
  { state: 'WI', year: 1954, total: 682 },
  { state: 'WI', year: 1955, total: 11885 },
  { state: 'WI', year: 1956, total: 4929 },
  { state: 'WI', year: 1957, total: 1270 },
  { state: 'WI', year: 1958, total: 163 },
  { state: 'WI', year: 1959, total: 618 },
  { state: 'OH', year: 1950, total: 1801 },
  { state: 'OH', year: 1951, total: 1131 },
  { state: 'OH', year: 1952, total: 4176 },
  { state: 'OH', year: 1953, total: 3654 },
  { state: 'OH', year: 1954, total: 2438 },
  { state: 'OH', year: 1955, total: 12216 },
  { state: 'OH', year: 1956, total: 5797 },
  { state: 'OH', year: 1957, total: 5950 },
  { state: 'OH', year: 1958, total: 925 },
  { state: 'OH', year: 1959, total: 3458 },
  { state: 'MI', year: 1950, total: 2014 },
  { state: 'MI', year: 1951, total: 1484 },
  { state: 'MI', year: 1952, total: 4750 },
  { state: 'MI', year: 1953, total: 2889 },
  { state: 'MI', year: 1954, total: 2184 },
  { state: 'MI', year: 1955, total: 13404 },
  { state: 'MI', year: 1956, total: 10156 },
  { state: 'MI', year: 1957, total: 18606 },
  { state: 'MI', year: 1958, total: 2065 },
  { state: 'MI', year: 1959, total: 5174 },
  { state: 'NV', year: 1950, total: 12 },
  { state: 'NV', year: 1951, total: 41 },
  { state: 'NV', year: 1952, total: 97 },
  { state: 'NV', year: 1953, total: 48 },
  { state: 'NV', year: 1954, total: 111 },
  { state: 'NV', year: 1955, total: 977 },
  { state: 'NV', year: 1956, total: 183 },
  { state: 'NV', year: 1957, total: 120 },
  { state: 'NV', year: 1958, total: 17 },
  { state: 'NV', year: 1959, total: 76 },
  { state: 'NJ', year: 1950, total: 886 },
  { state: 'NJ', year: 1951, total: 446 },
  { state: 'NJ', year: 1952, total: 879 },
  { state: 'NJ', year: 1953, total: 867 },
  { state: 'NJ', year: 1954, total: 909 },
  { state: 'NJ', year: 1955, total: 4355 },
  { state: 'NJ', year: 1956, total: 1695 },
  { state: 'NJ', year: 1957, total: 4833 },
  { state: 'NJ', year: 1958, total: 557 },
  { state: 'NJ', year: 1959, total: 1553 },
  { state: 'WA', year: 1950, total: 639 },
  { state: 'WA', year: 1951, total: 424 },
  { state: 'WA', year: 1952, total: 1567 },
  { state: 'WA', year: 1953, total: 540 },
  { state: 'WA', year: 1954, total: 448 },
  { state: 'WA', year: 1955, total: 4378 },
  { state: 'WA', year: 1956, total: 550 },
  { state: 'WA', year: 1957, total: 687 },
  { state: 'WA', year: 1958, total: 424 },
  { state: 'WA', year: 1959, total: 2334 },
  { state: 'DE', year: 1950, total: 43 },
  { state: 'DE', year: 1951, total: 14 },
  { state: 'DE', year: 1952, total: 123 },
  { state: 'DE', year: 1953, total: 43 },
  { state: 'DE', year: 1954, total: 89 },
  { state: 'DE', year: 1955, total: 565 },
  { state: 'DE', year: 1956, total: 153 },
  { state: 'DE', year: 1957, total: 434 },
  { state: 'DE', year: 1958, total: 44 },
  { state: 'DE', year: 1959, total: 151 },
  { state: 'KY', year: 1950, total: 693 },
  { state: 'KY', year: 1951, total: 320 },
  { state: 'KY', year: 1952, total: 2041 },
  { state: 'KY', year: 1953, total: 419 },
  { state: 'KY', year: 1954, total: 846 },
  { state: 'KY', year: 1955, total: 3998 },
  { state: 'KY', year: 1956, total: 2251 },
  { state: 'KY', year: 1957, total: 1649 },
  { state: 'KY', year: 1958, total: 274 },
  { state: 'KY', year: 1959, total: 1232 },
  { state: 'WY', year: 1950, total: 46 },
  { state: 'WY', year: 1951, total: 203 },
  { state: 'WY', year: 1952, total: 123 },
  { state: 'WY', year: 1953, total: 74 },
  { state: 'WY', year: 1954, total: 273 },
  { state: 'WY', year: 1955, total: 716 },
  { state: 'WY', year: 1956, total: 361 },
  { state: 'WY', year: 1957, total: 213 },
  { state: 'WY', year: 1958, total: 17 },
  { state: 'WY', year: 1959, total: 51 },
  { state: 'IN', year: 1950, total: 595 },
  { state: 'IN', year: 1951, total: 361 },
  { state: 'IN', year: 1952, total: 1850 },
  { state: 'IN', year: 1953, total: 793 },
  { state: 'IN', year: 1954, total: 867 },
  { state: 'IN', year: 1955, total: 6995 },
  { state: 'IN', year: 1956, total: 4046 },
  { state: 'IN', year: 1957, total: 2279 },
  { state: 'IN', year: 1958, total: 444 },
  { state: 'IN', year: 1959, total: 1767 },
  { state: 'NH', year: 1950, total: 23 },
  { state: 'NH', year: 1951, total: 37 },
  { state: 'NH', year: 1952, total: 52 },
  { state: 'NH', year: 1953, total: 115 },
  { state: 'NH', year: 1954, total: 96 },
  { state: 'NH', year: 1955, total: 324 },
  { state: 'NH', year: 1956, total: 87 },
  { state: 'NH', year: 1957, total: 76 },
  { state: 'NH', year: 1958, total: 13 },
  { state: 'NH', year: 1959, total: 52 },
  { state: 'IL', year: 1950, total: 1915 },
  { state: 'IL', year: 1951, total: 1693 },
  { state: 'IL', year: 1952, total: 5357 },
  { state: 'IL', year: 1953, total: 2576 },
  { state: 'IL', year: 1954, total: 2210 },
  { state: 'IL', year: 1955, total: 37839 },
  { state: 'IL', year: 1956, total: 8203 },
  { state: 'IL', year: 1957, total: 4063 },
  { state: 'IL', year: 1958, total: 846 },
  { state: 'IL', year: 1959, total: 3282 },
  { state: 'MS', year: 1950, total: 401 },
  { state: 'MS', year: 1951, total: 699 },
  { state: 'MS', year: 1952, total: 700 },
  { state: 'MS', year: 1953, total: 336 },
  { state: 'MS', year: 1954, total: 520 },
  { state: 'MS', year: 1955, total: 6014 },
  { state: 'MS', year: 1956, total: 2944 },
  { state: 'MS', year: 1957, total: 2363 },
  { state: 'MS', year: 1958, total: 359 },
  { state: 'MS', year: 1959, total: 1799 },
  { state: 'NY', year: 1950, total: 4253 },
  { state: 'NY', year: 1951, total: 1714 },
  { state: 'NY', year: 1952, total: 2829 },
  { state: 'NY', year: 1953, total: 3476 },
  { state: 'NY', year: 1954, total: 2468 },
  { state: 'NY', year: 1955, total: 17469 },
  { state: 'NY', year: 1956, total: 5041 },
  { state: 'NY', year: 1957, total: 5014 },
  { state: 'NY', year: 1958, total: 1217 },
  { state: 'NY', year: 1959, total: 5535 },
  { state: 'NE', year: 1950, total: 438 },
  { state: 'NE', year: 1951, total: 433 },
  { state: 'NE', year: 1952, total: 2720 },
  { state: 'NE', year: 1953, total: 240 },
  { state: 'NE', year: 1954, total: 728 },
  { state: 'NE', year: 1955, total: 3370 },
  { state: 'NE', year: 1956, total: 2282 },
  { state: 'NE', year: 1957, total: 686 },
  { state: 'NE', year: 1958, total: 303 },
  { state: 'NE', year: 1959, total: 1862 },
  { state: 'ME', year: 1950, total: 98 },
  { state: 'ME', year: 1951, total: 49 },
  { state: 'ME', year: 1952, total: 202 },
  { state: 'ME', year: 1953, total: 370 },
  { state: 'ME', year: 1954, total: 136 },
  { state: 'ME', year: 1955, total: 815 },
  { state: 'ME', year: 1956, total: 190 },
  { state: 'ME', year: 1957, total: 123 },
  { state: 'ME', year: 1958, total: 151 },
  { state: 'ME', year: 1959, total: 694 },
  { state: 'AZ', year: 1950, total: 171 },
  { state: 'AZ', year: 1951, total: 293 },
  { state: 'AZ', year: 1952, total: 469 },
  { state: 'AZ', year: 1953, total: 473 },
  { state: 'AZ', year: 1954, total: 223 },
  { state: 'AZ', year: 1955, total: 3565 },
  { state: 'AZ', year: 1956, total: 1623 },
  { state: 'AZ', year: 1957, total: 744 },
  { state: 'AZ', year: 1958, total: 201 },
  { state: 'AZ', year: 1959, total: 1260 },
  { state: 'MN', year: 1950, total: 592 },
  { state: 'MN', year: 1951, total: 580 },
  { state: 'MN', year: 1952, total: 4751 },
  { state: 'MN', year: 1953, total: 2511 },
  { state: 'MN', year: 1954, total: 689 },
  { state: 'MN', year: 1955, total: 4279 },
  { state: 'MN', year: 1956, total: 1244 },
  { state: 'MN', year: 1957, total: 540 },
  { state: 'MN', year: 1958, total: 502 },
  { state: 'MN', year: 1959, total: 2593 },
  { state: 'AR', year: 1950, total: 335 },
  { state: 'AR', year: 1951, total: 444 },
  { state: 'AR', year: 1952, total: 391 },
  { state: 'AR', year: 1953, total: 333 },
  { state: 'AR', year: 1954, total: 371 },
  { state: 'AR', year: 1955, total: 4096 },
  { state: 'AR', year: 1956, total: 1751 },
  { state: 'AR', year: 1957, total: 643 },
  { state: 'AR', year: 1958, total: 631 },
  { state: 'AR', year: 1959, total: 3991 },
  { state: 'PR', year: 1954, total: 106 },
  { state: 'PR', year: 1955, total: 1748 },
  { state: 'PR', year: 1956, total: 795 },
  { state: 'PR', year: 1957, total: 1909 },
  { state: 'PR', year: 1958, total: 57 },
  { state: 'PR', year: 1959, total: 129 },
  { state: 'ND', year: 1950, total: 41 },
  { state: 'ND', year: 1951, total: 92 },
  { state: 'ND', year: 1952, total: 294 },
  { state: 'ND', year: 1953, total: 200 },
  { state: 'ND', year: 1954, total: 119 },
  { state: 'ND', year: 1955, total: 704 },
  { state: 'ND', year: 1956, total: 256 },
  { state: 'ND', year: 1957, total: 748 },
  { state: 'ND', year: 1958, total: 76 },
  { state: 'ND', year: 1959, total: 190 },
  { state: 'DC', year: 1950, total: 184 },
  { state: 'DC', year: 1951, total: 66 },
  { state: 'DC', year: 1952, total: 263 },
  { state: 'DC', year: 1953, total: 128 },
  { state: 'DC', year: 1954, total: 88 },
  { state: 'DC', year: 1955, total: 231 },
  { state: 'DC', year: 1956, total: 1107 },
  { state: 'DC', year: 1957, total: 211 },
  { state: 'DC', year: 1958, total: 22 },
  { state: 'DC', year: 1959, total: 73 },
  { state: 'MD', year: 1950, total: 714 },
  { state: 'MD', year: 1951, total: 144 },
  { state: 'MD', year: 1952, total: 199 },
  { state: 'MD', year: 1953, total: 542 },
  { state: 'MD', year: 1954, total: 246 },
  { state: 'MD', year: 1955, total: 2163 },
  { state: 'MD', year: 1956, total: 586 },
  { state: 'MD', year: 1957, total: 376 },
  { state: 'MD', year: 1958, total: 108 },
  { state: 'MD', year: 1959, total: 391 },
  { state: 'VT', year: 1950, total: 33 },
  { state: 'VT', year: 1951, total: 29 },
  { state: 'VT', year: 1952, total: 46 },
  { state: 'VT', year: 1953, total: 116 },
  { state: 'VT', year: 1954, total: 79 },
  { state: 'VT', year: 1955, total: 724 },
  { state: 'VT', year: 1956, total: 138 },
  { state: 'VT', year: 1957, total: 114 },
  { state: 'VT', year: 1958, total: 22 },
  { state: 'VT', year: 1959, total: 103 },
  { state: 'NM', year: 1950, total: 142 },
  { state: 'NM', year: 1951, total: 139 },
  { state: 'NM', year: 1952, total: 565 },
  { state: 'NM', year: 1953, total: 119 },
  { state: 'NM', year: 1954, total: 226 },
  { state: 'NM', year: 1955, total: 1543 },
  { state: 'NM', year: 1956, total: 1237 },
  { state: 'NM', year: 1957, total: 950 },
  { state: 'NM', year: 1958, total: 122 },
  { state: 'NM', year: 1959, total: 655 },
  { state: 'SC', year: 1950, total: 434 },
  { state: 'SC', year: 1951, total: 125 },
  { state: 'SC', year: 1952, total: 176 },
  { state: 'SC', year: 1953, total: 178 },
  { state: 'SC', year: 1954, total: 321 },
  { state: 'SC', year: 1955, total: 2598 },
  { state: 'SC', year: 1956, total: 3353 },
  { state: 'SC', year: 1957, total: 671 },
  { state: 'SC', year: 1958, total: 199 },
  { state: 'SC', year: 1959, total: 1118 },
  { state: 'MA', year: 1950, total: 512 },
  { state: 'MA', year: 1951, total: 296 },
  { state: 'MA', year: 1952, total: 822 },
  { state: 'MA', year: 1953, total: 913 },
  { state: 'MA', year: 1954, total: 1054 },
  { state: 'MA', year: 1955, total: 6166 },
  { state: 'MA', year: 1956, total: 597 },
  { state: 'MA', year: 1957, total: 565 },
  { state: 'MA', year: 1958, total: 323 },
  { state: 'MA', year: 1959, total: 1640 },
  { state: 'IA', year: 1950, total: 1281 },
  { state: 'IA', year: 1951, total: 442 },
  { state: 'IA', year: 1952, total: 3776 },
  { state: 'IA', year: 1953, total: 639 },
  { state: 'IA', year: 1954, total: 1450 },
  { state: 'IA', year: 1955, total: 12260 },
  { state: 'IA', year: 1956, total: 2418 },
  { state: 'IA', year: 1957, total: 1304 },
  { state: 'IA', year: 1958, total: 955 },
  { state: 'IA', year: 1959, total: 5844 },
  { state: 'RI', year: 1950, total: 52 },
  { state: 'RI', year: 1951, total: 15 },
  { state: 'RI', year: 1952, total: 104 },
  { state: 'RI', year: 1953, total: 288 },
  { state: 'RI', year: 1954, total: 122 },
  { state: 'RI', year: 1955, total: 646 },
  { state: 'RI', year: 1956, total: 8 },
  { state: 'RI', year: 1958, total: 23 },
  { state: 'RI', year: 1959, total: 116 },
  { state: 'RI', year: 1957, total: 59 },
  { state: 'CT', year: 1950, total: 481 },
  { state: 'CT', year: 1951, total: 293 },
  { state: 'CT', year: 1952, total: 470 },
  { state: 'CT', year: 1953, total: 436 },
  { state: 'CT', year: 1954, total: 448 },
  { state: 'CT', year: 1955, total: 2127 },
  { state: 'CT', year: 1956, total: 910 },
  { state: 'CT', year: 1957, total: 867 },
  { state: 'CT', year: 1958, total: 274 },
  { state: 'CT', year: 1959, total: 1351 },
  { state: 'GA', year: 1950, total: 495 },
  { state: 'GA', year: 1951, total: 657 },
  { state: 'GA', year: 1952, total: 584 },
  { state: 'GA', year: 1953, total: 557 },
  { state: 'GA', year: 1954, total: 755 },
  { state: 'GA', year: 1955, total: 4215 },
  { state: 'GA', year: 1956, total: 2149 },
  { state: 'GA', year: 1957, total: 1171 },
  { state: 'GA', year: 1958, total: 366 },
  { state: 'GA', year: 1959, total: 1934 },
  { state: 'CO', year: 1950, total: 213 },
  { state: 'CO', year: 1951, total: 1076 },
  { state: 'CO', year: 1952, total: 967 },
  { state: 'CO', year: 1953, total: 284 },
  { state: 'CO', year: 1954, total: 397 },
  { state: 'CO', year: 1955, total: 2891 },
  { state: 'CO', year: 1956, total: 1249 },
  { state: 'CO', year: 1957, total: 499 },
  { state: 'CO', year: 1958, total: 71 },
  { state: 'CO', year: 1959, total: 330 },
  { state: 'SD', year: 1950, total: 187 },
  { state: 'SD', year: 1951, total: 126 },
  { state: 'SD', year: 1952, total: 869 },
  { state: 'SD', year: 1953, total: 222 },
  { state: 'SD', year: 1954, total: 142 },
  { state: 'SD', year: 1955, total: 956 },
  { state: 'SD', year: 1956, total: 916 },
  { state: 'SD', year: 1957, total: 311 },
  { state: 'SD', year: 1958, total: 40 },
  { state: 'SD', year: 1959, total: 273 },
  { state: 'TN', year: 1950, total: 569 },
  { state: 'TN', year: 1951, total: 703 },
  { state: 'TN', year: 1952, total: 860 },
  { state: 'TN', year: 1953, total: 708 },
  { state: 'TN', year: 1954, total: 601 },
  { state: 'TN', year: 1955, total: 3011 },
  { state: 'TN', year: 1956, total: 3343 },
  { state: 'TN', year: 1957, total: 2251 },
  { state: 'TN', year: 1958, total: 848 },
  { state: 'TN', year: 1959, total: 4395 },
  { state: 'KS', year: 1950, total: 522 },
  { state: 'KS', year: 1951, total: 796 },
  { state: 'KS', year: 1952, total: 1820 },
  { state: 'KS', year: 1953, total: 567 },
  { state: 'KS', year: 1954, total: 700 },
  { state: 'KS', year: 1955, total: 3769 },
  { state: 'KS', year: 1956, total: 1772 },
  { state: 'KS', year: 1957, total: 625 },
  { state: 'KS', year: 1958, total: 398 },
  { state: 'KS', year: 1959, total: 2381 },
  { state: 'VA', year: 1950, total: 1218 },
  { state: 'VA', year: 1951, total: 241 },
  { state: 'VA', year: 1952, total: 750 },
  { state: 'VA', year: 1953, total: 800 },
  { state: 'VA', year: 1954, total: 603 },
  { state: 'VA', year: 1955, total: 4494 },
  { state: 'VA', year: 1956, total: 2466 },
  { state: 'VA', year: 1957, total: 2585 },
  { state: 'VA', year: 1958, total: 709 },
  { state: 'VA', year: 1959, total: 3458 },
  { state: 'AK', year: 1950, total: 62 },
  { state: 'AK', year: 1951, total: 31 },
  { state: 'AK', year: 1954, total: 333 },
  { state: 'AK', year: 1955, total: 368 },
  { state: 'AK', year: 1956, total: 114 },
  { state: 'AK', year: 1957, total: 53 },
  { state: 'AK', year: 1958, total: 50 },
  { state: 'AK', year: 1959, total: 268 },
  { state: 'AL', year: 1950, total: 282 },
  { state: 'AL', year: 1951, total: 674 },
  { state: 'AL', year: 1952, total: 471 },
  { state: 'AL', year: 1953, total: 660 },
  { state: 'AL', year: 1954, total: 376 },
  { state: 'AL', year: 1955, total: 1803 },
  { state: 'AL', year: 1956, total: 1299 },
  { state: 'AL', year: 1957, total: 974 },
  { state: 'AL', year: 1958, total: 550 },
  { state: 'AL', year: 1959, total: 3118 },
  { state: 'OK', year: 1950, total: 526 },
  { state: 'OK', year: 1951, total: 660 },
  { state: 'OK', year: 1952, total: 1269 },
  { state: 'OK', year: 1953, total: 708 },
  { state: 'OK', year: 1954, total: 561 },
  { state: 'OK', year: 1955, total: 4660 },
  { state: 'OK', year: 1956, total: 2940 },
  { state: 'OK', year: 1957, total: 1386 },
  { state: 'OK', year: 1958, total: 367 },
  { state: 'OK', year: 1959, total: 2094 },
  { state: 'FL', year: 1950, total: 466 },
  { state: 'FL', year: 1951, total: 347 },
  { state: 'FL', year: 1952, total: 756 },
  { state: 'FL', year: 1953, total: 760 },
  { state: 'FL', year: 1954, total: 1784 },
  { state: 'FL', year: 1955, total: 8153 },
  { state: 'FL', year: 1956, total: 3866 },
  { state: 'FL', year: 1957, total: 5794 },
  { state: 'FL', year: 1958, total: 610 },
  { state: 'FL', year: 1959, total: 3598 },
  { state: 'TX', year: 1950, total: 2788 },
  { state: 'TX', year: 1951, total: 1943 },
  { state: 'TX', year: 1952, total: 4785 },
  { state: 'TX', year: 1953, total: 2012 },
  { state: 'TX', year: 1954, total: 3087 },
  { state: 'TX', year: 1955, total: 34694 },
  { state: 'TX', year: 1956, total: 20044 },
  { state: 'TX', year: 1957, total: 11695 },
  { state: 'TX', year: 1958, total: 1597 },
  { state: 'TX', year: 1959, total: 8068 },
  { state: 'MT', year: 1950, total: 47 },
  { state: 'MT', year: 1951, total: 134 },
  { state: 'MT', year: 1952, total: 262 },
  { state: 'MT', year: 1953, total: 248 },
  { state: 'MT', year: 1954, total: 179 },
  { state: 'MT', year: 1955, total: 1071 },
  { state: 'MT', year: 1956, total: 339 },
  { state: 'MT', year: 1957, total: 1334 },
  { state: 'MT', year: 1958, total: 85 },
  { state: 'MT', year: 1959, total: 143 },
  { state: 'UT', year: 1950, total: 83 },
  { state: 'UT', year: 1951, total: 575 },
  { state: 'UT', year: 1952, total: 491 },
  { state: 'UT', year: 1953, total: 322 },
  { state: 'UT', year: 1954, total: 276 },
  { state: 'UT', year: 1955, total: 4005 },
  { state: 'UT', year: 1956, total: 1277 },
  { state: 'UT', year: 1957, total: 281 },
  { state: 'UT', year: 1958, total: 32 },
  { state: 'UT', year: 1959, total: 151 },
  { state: 'MO', year: 1950, total: 413 },
  { state: 'MO', year: 1951, total: 708 },
  { state: 'MO', year: 1952, total: 1422 },
  { state: 'MO', year: 1953, total: 958 },
  { state: 'MO', year: 1954, total: 655 },
  { state: 'MO', year: 1955, total: 8150 },
  { state: 'MO', year: 1956, total: 3237 },
  { state: 'MO', year: 1957, total: 2443 },
  { state: 'MO', year: 1958, total: 1133 },
  { state: 'MO', year: 1959, total: 6341 },
  { state: 'CA', year: 1950, total: 2127 },
  { state: 'CA', year: 1951, total: 3187 },
  { state: 'CA', year: 1952, total: 4994 },
  { state: 'CA', year: 1953, total: 4887 },
  { state: 'CA', year: 1954, total: 4611 },
  { state: 'CA', year: 1955, total: 54585 },
  { state: 'CA', year: 1956, total: 20146 },
  { state: 'CA', year: 1957, total: 7178 },
  { state: 'CA', year: 1958, total: 1165 },
  { state: 'CA', year: 1959, total: 6479 },
  { state: 'ID', year: 1950, total: 161 },
  { state: 'ID', year: 1951, total: 129 },
  { state: 'ID', year: 1952, total: 368 },
  { state: 'ID', year: 1953, total: 101 },
  { state: 'ID', year: 1954, total: 124 },
  { state: 'ID', year: 1955, total: 2451 },
  { state: 'ID', year: 1956, total: 634 },
  { state: 'ID', year: 1957, total: 235 },
  { state: 'ID', year: 1958, total: 24 },
  { state: 'ID', year: 1959, total: 144 },
  { state: 'NC', year: 1950, total: 756 },
  { state: 'NC', year: 1951, total: 315 },
  { state: 'NC', year: 1952, total: 1126 },
  { state: 'NC', year: 1953, total: 944 },
  { state: 'NC', year: 1954, total: 739 },
  { state: 'NC', year: 1955, total: 6886 },
  { state: 'NC', year: 1956, total: 5064 },
  { state: 'NC', year: 1957, total: 2799 },
  { state: 'NC', year: 1958, total: 638 },
  { state: 'NC', year: 1959, total: 3217 },
  { state: 'WV', year: 1950, total: 380 },
  { state: 'WV', year: 1951, total: 276 },
  { state: 'WV', year: 1952, total: 718 },
  { state: 'WV', year: 1953, total: 529 },
  { state: 'WV', year: 1954, total: 388 },
  { state: 'WV', year: 1955, total: 2341 },
  { state: 'WV', year: 1956, total: 1025 },
  { state: 'WV', year: 1957, total: 3216 },
  { state: 'WV', year: 1958, total: 569 },
  { state: 'WV', year: 1959, total: 2314 },
  { state: 'OR', year: 1950, total: 523 },
  { state: 'OR', year: 1951, total: 361 },
  { state: 'OR', year: 1952, total: 541 },
  { state: 'OR', year: 1953, total: 392 },
  { state: 'OR', year: 1954, total: 381 },
  { state: 'OR', year: 1955, total: 4306 },
  { state: 'OR', year: 1956, total: 1427 },
  { state: 'OR', year: 1957, total: 916 },
  { state: 'OR', year: 1958, total: 373 },
  { state: 'OR', year: 1959, total: 2019 },
  { state: 'HI', year: 1950, total: 20 },
  { state: 'HI', year: 1951, total: 28 },
  { state: 'HI', year: 1954, total: 234 },
  { state: 'HI', year: 1955, total: 2610 },
  { state: 'HI', year: 1956, total: 252 },
  { state: 'HI', year: 1957, total: 1688 },
  { state: 'HI', year: 1958, total: 76 },
  { state: 'HI', year: 1959, total: 155 },
  { state: 'HI', year: 1953, total: 17 },
  { state: 'LA', year: 1950, total: 409 },
  { state: 'LA', year: 1951, total: 811 },
  { state: 'LA', year: 1952, total: 1131 },
  { state: 'LA', year: 1953, total: 524 },
  { state: 'LA', year: 1954, total: 540 },
  { state: 'LA', year: 1955, total: 14236 },
  { state: 'LA', year: 1956, total: 5106 },
  { state: 'LA', year: 1957, total: 1802 },
  { state: 'LA', year: 1958, total: 348 },
  { state: 'LA', year: 1959, total: 2080 },
  { state: 'PA', year: 1950, total: 1337 },
  { state: 'PA', year: 1951, total: 772 },
  { state: 'PA', year: 1952, total: 1997 },
  { state: 'PA', year: 1953, total: 1806 },
  { state: 'PA', year: 1954, total: 1436 },
  { state: 'PA', year: 1955, total: 4204 },
  { state: 'PA', year: 1956, total: 1178 },
  { state: 'PA', year: 1957, total: 1707 },
  { state: 'PA', year: 1958, total: 465 },
  { state: 'PA', year: 1959, total: 1913 },
];
