import { mockedChristmasBannerContent } from "@/mocks/data/cms";
import { Message, MessageProps } from "../../components/Message";

export default function BannerMessage(props: MessageProps) {
  const { enabledBanners } = props;
  const { christmasMessage } = enabledBanners;
  return (
    <Message variant="filled" severity="warning" {...props}>
      {christmasMessage && mockedChristmasBannerContent()}
    </Message>
  );
}
