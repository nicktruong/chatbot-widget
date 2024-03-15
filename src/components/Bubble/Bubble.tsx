import styled, { css } from "styled-components";

export const Bubble = styled.div<{ $perspective: "user" | "bot" }>`
  ${(props) =>
    props.$perspective === "user"
      ? css`
          margin-left: auto;
          color: white;
          background: radial-gradient(
            circle at 10% 20%,
            rgb(7, 121, 222) 0%,
            rgb(20, 72, 140) 90%
          );
        `
      : css`
          background: #f0f2f8;
        `}
`;
