import { mockedChristmasBannerContent } from "@/mocks/data/cms";
import { BannerLists, Message, MessageProps } from "../../components/Message";

export interface BannerMessageProps extends Omit<MessageProps, "children"> {
  enabledBanners: BannerLists;
}
export default function BannerMessage(props: BannerMessageProps) {
  const { enabledBanners, ...messageProps } = props;
  const { christmasMessage } = enabledBanners;

  return (
    <Message
      variant="filled"
      severity="warning"
      data-testid="banner"
      {...messageProps}>
      {christmasMessage && mockedChristmasBannerContent()}
    </Message>
  );
}
