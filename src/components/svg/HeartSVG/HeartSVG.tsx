const HeartSVG = ({ color }: { color?: string }) => (
<svg xmlns="http://www.w3.org/2000/svg"fill={color || 'none'} width="16px" height="16px" viewBox="0 0 24 24">
  <path d="M12 20a1 1 0 0 1-.437-.1C11.214 19.73 3 15.671 3 9a5 5 0 0 1 8.535-3.536l.465.465.465-.465A5 5 0 0 1 21 9c0 6.646-8.212 10.728-8.562 10.9A1 1 0 0 1 12 20z"/>
</svg>
);

export default HeartSVG;