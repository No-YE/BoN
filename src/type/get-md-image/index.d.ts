declare module 'get-md-image' {
  export default function(str: string): {
    alt: string;
    src: string;
    html: string;
  } | undefined;
}
