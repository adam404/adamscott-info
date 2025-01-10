import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

interface ContactAdminNotificationEmailProps {
  name: string;
  email: string;
  message: string;
}

export const ContactAdminNotificationEmail = ({
  name,
  email,
  message,
}: ContactAdminNotificationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>{`New contact form submission from ${name}`}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              New Contact Form Submission
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              You received a new message from your website's contact form:
            </Text>

            <Section className="bg-[#f9f9f9] border border-solid border-[#eaeaea] rounded p-[20px] my-[20px]">
              <Text className="text-black text-[14px] leading-[24px] m-0">
                <strong>Name:</strong> {name}
              </Text>
              <Text className="text-black text-[14px] leading-[24px] m-0">
                <strong>Email:</strong> {email}
              </Text>
              <Hr className="border border-solid border-[#eaeaea] my-[20px] mx-0 w-full" />
              <Text className="text-black text-[14px] leading-[24px] m-0">
                <strong>Message:</strong>
              </Text>
              <Text className="text-black text-[14px] leading-[24px] m-0">
                {message}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
