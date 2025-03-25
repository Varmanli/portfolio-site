interface StarIconProps {
  size?: number;
  color?: string;
  className?: string;
}

export default function StarIcon({
  size = 60,
  color = "#F3ABCB",
  className = "",
}: StarIconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={(size * 105) / 115}
      viewBox="0 0 115 105"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_1_5)">
        <path
          stroke="black"
          strokeWidth={2}
          d="M49.1742 17.1615V34.3231L40.198 29.8461C35.2611 27.4585 30.6233 25.3692 29.7257 25.3692C26.2848 25.3692 28.6785 29.9954 35.1115 35.6661C39.7492 39.6954 41.3948 41.9338 40.0484 42.3815C38.8516 42.8292 30.0249 45.2169 20.1511 47.6046C1.74976 52.0815 -1.99034 54.0215 0.852133 56.8569C1.89936 57.9015 9.08035 57.4538 25.088 55.0662C37.6547 53.2754 48.2766 52.2308 48.7254 52.6785C49.1742 53.2754 46.631 58.4985 43.1901 64.4677C39.5996 70.4369 36.6075 75.8092 36.3083 76.2569C36.0091 76.8538 36.7571 78.0477 37.8043 78.9431C39.5996 80.4354 41.0956 79.6892 45.8829 75.5108C49.1742 72.5262 52.4655 70.1385 53.2135 70.1385C53.9616 70.1385 55.4576 74.6154 56.6544 80.1369C59.1977 92.9708 60.993 97 64.2842 97C68.3235 97 69.0716 92.3738 67.8747 75.2123C67.2763 66.5569 67.2763 59.6923 68.0243 59.6923C68.7724 59.6923 74.7565 62.08 81.3391 64.9154C94.3546 70.5862 98.5436 71.3323 98.5436 68.0492C98.5436 65.0646 96.1499 62.9754 84.6304 55.0662C79.095 51.4846 74.6069 48.0523 74.6069 47.6046C74.6069 47.1569 82.2367 44.62 91.5122 41.9338C108.118 37.1585 115 34.0246 115 31.3385C115 29.1 105.575 29.5477 90.6145 32.2338C83.4336 33.5769 77.0006 34.3231 76.5518 33.7262C76.103 33.2785 77.1502 29.3985 78.9454 25.22C85.6776 8.95383 81.4887 7.46153 71.0164 22.5338C67.1267 28.3538 63.237 32.5323 62.6386 31.7861C62.0402 31.1892 60.3945 25.22 58.8985 18.6538C55.9064 4.62614 53.9616 -7.62939e-06 51.1191 -7.62939e-06C49.623 -7.62939e-06 49.1742 3.88 49.1742 17.1615Z"
          fill={color}
        />
        <path
          d="M50.1742 34.3231V35.9393L48.7279 35.2179L39.7626 30.7464..."
          stroke="black"
          strokeWidth={2}
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1_5"
          x="0"
          y="0"
          width="115"
          height="104.765"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="7.76457" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.745098 0 0 0 0 0.74902 0 0 0 0 0.705882 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1_5"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1_5"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
