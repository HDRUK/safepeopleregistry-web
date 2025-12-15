import { mockedChristmasBannerContent } from "@/mocks/data/cms";
import { Message, MessageProps } from "../../components/Message";


export default function BannerMessage(props: MessageProps) {
  const {christmasMessage} = props.enabledBanners
  return (
    <Message variant="filled" severity="warning" {...props}>
      {christmasMessage && mockedChristmasBannerContent()}
    </Message>
  );
}
