import * as React from "react"
import Svg, {
  Path,
  Mask,
  G,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
} from "react-native-svg"
const SVGEmptyCar = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" class="mdl-js" viewBox="0 0 342 340" height="340" width="342">
    <Path
      fill="#EFFAF3"
      d="M15.317 80.755.104 294.23c-1.802 24.321 19.893 42.852 50.599 39.377l215.383-26.545c11.948-1.614 22.776-7.809 30.153-17.25 7.376-9.441 10.71-21.372 9.282-33.223L280.76 59.781c-1.487-11.817-7.656-22.566-17.148-29.883-9.493-7.317-21.533-10.603-33.474-9.136L52.973 42.605c-26.048 3.209-34.754 8.965-37.656 38.15z"
    />
    <Mask
      id="a"
      width={367}
      height={339}
      x={0}
      y={8}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "alpha",
      }}
    >
      <Path
        fill="#EAF8F3"
        d="M16.676 73.115.126 303.498c-2.16 26.248 23.83 46.246 60.615 42.496l258.022-28.648c14.313-1.742 27.285-8.427 36.122-18.616s12.83-23.065 11.12-35.854L336.342 50.479c-1.782-12.753-9.171-24.353-20.543-32.25-11.372-7.896-25.796-11.443-40.1-9.86L61.787 31.943c-31.205 3.462-41.634 9.674-45.11 41.172z"
      />
    </Mask>
    <G mask="url(#a)">
      <Path
        fill="url(#b)"
        d="M297.081 275.563c-11.742-.045-21.208-13.281-21.145-29.562.064-16.281 9.633-29.442 21.375-29.396 11.741.045 21.208 13.281 21.144 29.562-.063 16.281-9.633 29.442-21.374 29.396z"
      />
      <Path
        fill="url(#c)"
        d="m285.913 216.56 11.399.045-.229 58.911-11.4-.044.23-58.912z"
      />
      <Path
        fill="url(#d)"
        d="M285.682 275.52c-8.952-.035-16.158-13.262-16.094-29.543.063-16.281 7.372-29.451 16.324-29.416 8.952.035 16.158 13.261 16.094 29.542-.063 16.281-7.372 29.452-16.324 29.417z"
      />
      <Path
        fill="#13192E"
        d="M284.165 270.067c-6.508-.026-11.742-10.806-11.69-24.079.051-13.273 5.369-24.012 11.878-23.987 6.508.026 11.742 10.806 11.69 24.079-.052 13.273-5.37 24.012-11.878 23.987z"
      />
      <Path
        fill="#0EA971"
        d="m251.496 172.468 4.587-4.474 6.833-.498c2.406-.182 4.293-3.137 4.308-6.769.014-3.727-1.994-6.793-4.496-6.803l-3.992-.015c-2.261-.009-4.337 1.99-5.263 5.092l-1.072 3.532-4.007 3.52c-1.4 1.237-1.651 4.151-.504 5.876 1.005 1.389 2.495 1.634 3.606.539z"
      />
      <Path
        fill="#13192E"
        d="M324.378 256.558c-.018 4.443-3.828 7.152-16.815 7.101-12.986-.051-64.636-2.402-75.362-2.444-10.726-.042-129.187-1.89-129.187-1.89s-8.02-52.493 19.509-56.733c27.529-4.241 201.855 53.966 201.855 53.966z"
      />
      <Path
        fill="url(#e)"
        d="M146.752 279.898c-15.726-.061-28.413-15.833-28.338-35.228.076-19.395 12.886-35.068 28.612-35.006 15.726.061 28.413 15.833 28.337 35.228-.076 19.395-12.885 35.068-28.611 35.006z"
      />
      <Path
        fill="url(#f)"
        d="m131.776 209.604 15.247.059-.273 70.187-15.248-.06.274-70.186z"
      />
      <Path
        fill="url(#g)"
        d="M131.502 279.84c-11.98-.047-21.631-15.807-21.555-35.202.075-19.395 9.849-35.079 21.829-35.033 11.981.047 21.631 15.807 21.556 35.202-.076 19.395-9.849 35.08-21.83 35.033z"
      />
      <Path
        fill="#151C32"
        d="M129.508 273.332c-8.713-.034-15.726-12.874-15.665-28.68.062-15.807 7.175-28.592 15.888-28.558 8.714.034 15.727 12.875 15.665 28.681-.062 15.806-7.175 28.591-15.888 28.557z"
      />
      <Path
        fill="url(#h)"
        d="M129.602 250.256c-1.514-.006-2.733-2.257-2.722-5.028.01-2.771 1.247-5.012 2.761-5.007 1.514.006 2.733 2.257 2.722 5.028-.011 2.771-1.247 5.013-2.761 5.007z"
      />
      <Path
        fill="url(#i)"
        d="M129.51 274.527c8.85.034 16.164-13.077 16.227-29.273.063-16.15-7.1-29.365-15.998-29.399-8.851-.035-16.165 13.076-16.228 29.273-.063 16.197 7.1 29.364 15.999 29.399zm.221-56.666c8.273.033 14.959 12.338 14.9 27.436-.059 15.098-6.841 27.303-15.114 27.271-8.273-.032-14.959-12.338-14.9-27.388.059-15.098 6.841-27.351 15.114-27.319z"
      />
      <Path
        fill="url(#j)"
        d="m129.616 247.149 3.194-29.658s-4.419-1.451-6.589-.026l3.395 29.684z"
      />
      <Path
        fill="url(#k)"
        d="m128.61 245.809 16.467-3.758s-.594-8.173-1.976-11.428l-14.491 15.186z"
      />
      <Path
        fill="url(#l)"
        d="m129.005 243.659 6.963 27.357s4.103-3.567 5.367-7.05l-12.33-20.307z"
      />
      <Path
        fill="url(#m)"
        d="M130.254 243.664 118.1 264.305s3.104 5.937 5.312 7.092l6.842-27.733z"
      />
      <Path
        fill="url(#n)"
        d="m130.631 245.816-14.471-14.583s-2.144 7.255-2.064 11.413l16.535 3.17z"
      />
      <Path
        fill="url(#o)"
        d="M-16.542 267.457c-13.574-.053-24.525-13.679-24.46-30.435.066-16.756 11.123-30.296 24.697-30.243 13.574.053 24.525 13.679 24.46 30.435-.065 16.756-11.122 30.296-24.697 30.243z"
      />
      <Path
        fill="#5FCF86"
        d="M325.697 263.729c7.436-7.329 13.581-16.622 13.581-16.622l.126-32.298s-8.339-20.196-78.946-45.603c0 0-24.678-23.891-65.881-40.774-52.985-5.319-128.594-6.044-141.2-4.899-19.487 1.692-42.125 9.63-67.977 27.733-25.804 18.104-42.431 26.735-45.082 40.437-2.307 11.745 1.139 40.856 1.634 49.458.09 1.481.663 2.869 1.62 4.02l5.943 5.517s-8.962-45.234 17.636-45.13c26.599.104 21.151 52.497 21.151 52.497l123.217 3.586c-1.536-25.52-.899-53.277 21.425-54.815 25.837-1.762 30.14 29.502 30.035 56.258l73.591.287 6.905-6.805 75.996.296 6.226 6.857z"
      />
      <Path
        fill="#5FCF86"
        d="M54.166 130.416c11.118-1.868 20.351-1.307 26.355.962 6.003 2.27 25.456 21.553 32.973 30.421 7.517 8.821 7.507 11.449 7.497 14.029-.01 2.58-11.294 22.364-12.5 35.642-1.207 13.278-3.627 29.466-1.831 37.548l-70.656-.276c.048 0-2.189-92.462 18.162-118.326z"
      />
      <Path
        fill="#5FCF86"
        d="M54.166 130.415c-4.606 9.156-14.065 29.712-16.803 53.495-2.69 23.832-2.97 58.28-2.995 64.777l-39.248-.153c-1.273-31.443-7.093-43.793-17.558-49.042.024-6.068.508-31.58 5.35-39.588 4.889-8.008 45.363-38.572 71.254-29.489z"
      />
      <Path
        fill="url(#p)"
        d="M316.724 208.891c3.655.014 11.878 12.899 11.878 12.899s-5.626 24.25-12.04 28.573c-6.406 2.125-61.954.475-61.954.475s-20.124-20.003-23.028-27.515c1.463-5.346 14.095-13.037 15.785-14.655 13.951-.519 33.136 1.133 39.966 1.16 6.83.026 22.559.04 29.393-.937z"
      />
      <Path
        fill="#CFF1DB"
        d="M232.409 207.701c-4.113 6.339-6.294 10.678-9.714 11.859-3.42 1.229-32.372.256-42.656-1.982-10.333-2.19-21.939-10.788-22.778-17.719.76-10.031 20.23-7.231 26.05-7.209 5.82.023 43.001 12.256 49.098 15.051zm87.881-.228c-.006 1.433 6.213 10.202 8.33 10.21 2.116.008 5.508-6.334 5.521-9.535.012-3.154-9.772-10.598-12.468-9.988-2.696.611-1.376 7.354-1.383 9.313z"
      />
      <Path
        fill="url(#q)"
        d="M75.28 131.501c14.682 9.04 33.987 29.517 39.201 36.895 5.214 7.379-38.208 4.199-55.62 4.131-17.46-.068-14.385 1.043-14.37-2.636.011-3.153 6.605-28.833 13.905-38.217 1.112-1.525 15.202-.705 16.883-.173z"
      />
      <Path
        fill="url(#r)"
        d="M49.887 130.495c2.736 1.253-11.028 28.051-11.942 40.327-8.42.54-44.634-.461-48.947-4.73.398-3.2 10.024-17.305 26.704-26.796 9.737-5.504 24.423-9.461 34.185-8.801z"
      />
      <Path
        fill="url(#s)"
        d="M88.222 130.548c13.345 6.598 35.399 37.454 40.877 38.813 5.478 1.359 122.37-1.482 122.37-1.482-11.49-13.709-46.004-31.427-54.933-35.857-8.978-4.431-94.595-4.24-108.314-1.474z"
      />
      <Path
        fill="#fff"
        d="M201.198 207.055c.322 3.777-2.097 7.112-5.369 7.386s-6.243-2.557-6.565-6.381c-.322-3.776 2.096-7.111 5.368-7.385 3.32-.274 6.244 2.604 6.566 6.38zm12.93 2.726c.276 3.155-1.755 5.919-4.498 6.147-2.743.228-5.187-2.123-5.463-5.325-.276-3.155 1.755-5.919 4.498-6.147 2.742-.228 5.186 2.123 5.463 5.325z"
      />
      <Path
        fill="#0EA971"
        d="M205.429 255.997c-3.002-.011-5.423-3.315-5.407-7.379.016-4.064 2.462-7.349 5.464-7.338 3.002.012 5.423 3.316 5.407 7.38-.016 4.064-2.462 7.349-5.464 7.337z"
      />
      <Path
        fill="#0EA971"
        d="M208.97 248.652c-.011 2.628-1.606 4.772-3.531 4.764-1.972-.008-3.503-2.164-3.492-4.792.01-2.628 1.606-4.772 3.53-4.764 1.972.007 3.503 2.164 3.493 4.792zm125.02-2.425c-.014 3.584-1.901 6.443-4.162 6.434-2.309-.009-4.125-2.883-4.111-6.466.014-3.584 1.901-6.444 4.162-6.435 2.261.009 4.125 2.883 4.111 6.467z"
      />
      <Path
        fill="#0EA971"
        d="M332.55 246.222c-.009 2.294-1.219 4.2-2.71 4.195-1.491-.006-2.687-1.874-2.678-4.216.01-2.341 1.219-4.2 2.711-4.194 1.443.005 2.686 1.874 2.677 4.215z"
      />
      <Path
        fill="url(#t)"
        d="m265.657 241.755 44.443.174a1.34 1.34 0 0 0 1.352-1.333l.035-8.982a1.34 1.34 0 0 0-1.342-1.343l-44.443-.174a1.34 1.34 0 0 0-1.352 1.333l-.035 8.982c.045.765.62 1.34 1.342 1.343z"
      />
      <Path
        fill="url(#u)"
        d="m284.109 221.807 8.562.034c1.877.007 3.422-1.516 3.429-3.38.007-1.863-1.526-3.398-3.402-3.405l-8.562-.034c-1.876-.007-3.422 1.516-3.429 3.379-.007 1.864 1.526 3.399 3.402 3.406z"
      />
      <Path
        fill="#0EA971"
        d="m100.45 176.417-6.957-4.519-10.387-.566c-3.655-.205-6.481-3.178-6.467-6.81.015-3.726 3.105-6.772 6.857-6.757l6.108.023a8.663 8.663 0 0 1 7.916 5.144l1.574 3.542 6.046 3.559c2.112 1.25 2.485 4.166.699 5.879-1.449 1.428-3.662 1.611-5.389.505zM60.865 188.83c-.006 1.481-2.174 2.476-6.215 2.46-4.04-.016-12.312-.574-12.59-3.394 1.882-1.426 16.309-.462 18.805.934z"
      />
    </G>
    <G clipPath="url(#v)">
      <Path
        fill="#F26A2B"
        d="M170.499 41.548c6.196-12.25 1.289-27.204-10.961-33.4-12.251-6.196-27.204-1.288-33.401 10.962-6.196 12.25-1.288 27.204 10.962 33.4 12.25 6.196 27.204 1.289 33.4-10.962z"
      />
      <Path
        fill="#fff"
        d="M140.354 18.449c3.005-.893 6.751 2.564 8.967 7.987 4.521-3.76 9.29-5.185 11.62-3.021 2.59 2.464.919 8.661-4.077 13.67a26.797 26.797 0 0 1-9.33 5.746c-2.387.844-3 .318-4.125-1.006a24.231 24.231 0 0 1-5.669-9.37c-2.076-6.734-.745-13.043 2.614-14.006z"
      />
    </G>
    <G clipPath="url(#w)">
      <Path
        fill="#F26A2B"
        d="M115.709 56.648c.147-7.37-5.709-13.466-13.081-13.612-7.37-.147-13.465 5.71-13.612 13.08-.147 7.372 5.71 13.466 13.081 13.613 7.371.147 13.466-5.71 13.612-13.08z"
      />
      <Path
        fill="#fff"
        d="M95.742 52.487c1.246-1.132 3.864-.33 6.199 1.778 1.313-2.872 3.289-4.672 4.92-4.167 1.828.59 2.461 3.977 1.209 7.564a14.381 14.381 0 0 1-3.177 4.953c-.959.965-1.378.853-2.23.474a13.008 13.008 0 0 1-4.926-3.215c-2.572-2.776-3.396-6.139-1.995-7.387z"
      />
    </G>
    <Defs>
      <LinearGradient
        id="b"
        x1={297.059}
        x2={297.4}
        y1={275.667}
        y2={188.406}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#2C3E63" />
        <Stop offset={1} stopColor="#13192E" />
      </LinearGradient>
      <LinearGradient
        id="c"
        x1={291.36}
        x2={291.7}
        y1={275.645}
        y2={188.384}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#2C3E63" />
        <Stop offset={1} stopColor="#13192E" />
      </LinearGradient>
      <LinearGradient
        id="d"
        x1={285.657}
        x2={285.998}
        y1={275.623}
        y2={188.362}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#2C3E63" />
        <Stop offset={1} stopColor="#13192E" />
      </LinearGradient>
      <LinearGradient
        id="e"
        x1={146.751}
        x2={147.157}
        y1={280.03}
        y2={176.046}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#2C3E63" />
        <Stop offset={1} stopColor="#13192E" />
      </LinearGradient>
      <LinearGradient
        id="f"
        x1={139.115}
        x2={139.52}
        y1={279.999}
        y2={176.016}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#2C3E63" />
        <Stop offset={1} stopColor="#13192E" />
      </LinearGradient>
      <LinearGradient
        id="g"
        x1={131.481}
        x2={131.887}
        y1={279.971}
        y2={175.988}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#2C3E63" />
        <Stop offset={1} stopColor="#13192E" />
      </LinearGradient>
      <LinearGradient
        id="h"
        x1={129.488}
        x2={129.714}
        y1={275.792}
        y2={217.717}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#EBEFF7" />
        <Stop offset={1} stopColor="#B3B6C2" />
      </LinearGradient>
      <LinearGradient
        id="i"
        x1={129.49}
        x2={129.717}
        y1={275.789}
        y2={217.719}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#EBEFF7" />
        <Stop offset={1} stopColor="#B3B6C2" />
      </LinearGradient>
      <LinearGradient
        id="j"
        x1={129.288}
        x2={129.514}
        y1={275.788}
        y2={217.718}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#EBEFF7" />
        <Stop offset={1} stopColor="#B3B6C2" />
      </LinearGradient>
      <LinearGradient
        id="k"
        x1={136.702}
        x2={136.929}
        y1={275.821}
        y2={217.746}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#EBEFF7" />
        <Stop offset={1} stopColor="#B3B6C2" />
      </LinearGradient>
      <LinearGradient
        id="l"
        x1={135.066}
        x2={135.292}
        y1={275.81}
        y2={217.741}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#EBEFF7" />
        <Stop offset={1} stopColor="#B3B6C2" />
      </LinearGradient>
      <LinearGradient
        id="m"
        x1={124.076}
        x2={124.303}
        y1={275.768}
        y2={217.698}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#EBEFF7" />
        <Stop offset={1} stopColor="#B3B6C2" />
      </LinearGradient>
      <LinearGradient
        id="n"
        x1={122.213}
        x2={122.439}
        y1={275.763}
        y2={217.689}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#EBEFF7" />
        <Stop offset={1} stopColor="#B3B6C2" />
      </LinearGradient>
      <LinearGradient
        id="o"
        x1={-16.542}
        x2={-16.192}
        y1={267.603}
        y2={177.77}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#2C3E63" />
        <Stop offset={1} stopColor="#13192E" />
      </LinearGradient>
      <LinearGradient
        id="p"
        x1={328.582}
        x2={231.587}
        y1={230.188}
        y2={229.81}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#2C3E63" />
        <Stop offset={1} stopColor="#13192E" />
      </LinearGradient>
      <LinearGradient
        id="q"
        x1={114.971}
        x2={44.311}
        y1={152.191}
        y2={151.916}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#2C3E63" />
        <Stop offset={1} stopColor="#13192E" />
      </LinearGradient>
      <LinearGradient
        id="r"
        x1={50.197}
        x2={-10.891}
        y1={150.72}
        y2={150.482}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#2C3E63" />
        <Stop offset={1} stopColor="#13192E" />
      </LinearGradient>
      <LinearGradient
        id="s"
        x1={183.565}
        x2={139.148}
        y1={134.379}
        y2={183.092}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#2C3E63" />
        <Stop offset={1} stopColor="#13192E" />
      </LinearGradient>
      <LinearGradient
        id="t"
        x1={261.271}
        x2={331.013}
        y1={220.626}
        y2={261.477}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#EBEFF7" />
        <Stop offset={1} stopColor="#B3B6C2" />
      </LinearGradient>
      <LinearGradient
        id="u"
        x1={288.405}
        x2={288.389}
        y1={215.031}
        y2={219.111}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#EBEFF7" />
        <Stop offset={1} stopColor="#B3B6C2" />
      </LinearGradient>
      <ClipPath id="v">
        <Path fill="#fff" d="M121 8.25 170.467 3l5.25 49.468-49.468 5.251z" />
      </ClipPath>
      <ClipPath id="w">
        <Path
          fill="#fff"
          d="M84 52.058 106.718 38l14.058 22.718-22.718 14.058z"
        />
      </ClipPath>
    </Defs>
  </Svg>
)
export default SVGEmptyCar
