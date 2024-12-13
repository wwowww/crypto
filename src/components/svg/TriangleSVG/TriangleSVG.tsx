const TriangleSVG = ({ color }: { color?: string }) => (
  <svg fill={color || 'none'} xmlns="http://www.w3.org/2000/svg" width="7" height="4" viewBox="0 0 7 4">
    <path
      fillRule="evenodd" 
      clipRule="evenodd"
      d="M3.87564 0.30063C3.67643 0.0729667 3.32227 0.0729671 3.12306 0.300631L0.724944 3.04134C0.442064 3.36463 0.671654 3.87059 1.10123 3.87059L5.89746 3.87059C6.32704 3.87059 6.55663 3.36463 6.27375 3.04133L3.87564 0.30063Z"
    />
  </svg>
);

export default TriangleSVG;