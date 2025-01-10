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

interface ContactConfirmationEmailProps {
  name: string;
  email: string;
  message: string;
}

export const ContactConfirmationEmail = ({
  name,
  email,
  message,
}: ContactConfirmationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Thank you for contacting Adam Scott</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Thank you for your message
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hi {name},
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Thank you for reaching out. I've received your message and will
              get back to you as soon as possible.
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

            <Text className="text-black text-[14px] leading-[24px]">
              Best regards,
              <br />
              Adam Scott
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
