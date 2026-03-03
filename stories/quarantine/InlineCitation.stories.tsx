import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";

import {
  InlineCitation,
  InlineCitationText,
  InlineCitationCard,
  InlineCitationCardTrigger,
  InlineCitationCardBody,
  InlineCitationCarousel,
  InlineCitationCarouselContent,
  InlineCitationCarouselItem,
  InlineCitationCarouselHeader,
  InlineCitationCarouselIndex,
  InlineCitationCarouselPrev,
  InlineCitationCarouselNext,
  InlineCitationSource,
  InlineCitationQuote,
} from "@/design-system/inline-citation";
import { Container } from "@/components/layouts/container";

const meta = {
  title: "🚧 Quarantine/InlineCitation",
  component: InlineCitation,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "⚠️ **PENDING DESIGN REVIEW** - This component is in quarantine awaiting designer approval before being added to the main design system.",
      },
    },
    backgrounds: {
      default: "quarantine",
      values: [{ name: "quarantine", value: "#fff3cd" }],
    },
  },
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof InlineCitation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-sm">
        <InlineCitation>
          <InlineCitationText>
            This is a citation example with a source.
          </InlineCitationText>
          <InlineCitationCard>
            <InlineCitationCardTrigger sources={["https://example.com"]} />
            <InlineCitationCardBody>
              <InlineCitationSource
                title="Example source"
                url="https://example.com"
                description="This is an example source description."
              />
            </InlineCitationCardBody>
          </InlineCitationCard>
        </InlineCitation>
      </p>
    </div>
  ),
};

export const MultipleSources: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-sm">
        <InlineCitation>
          <InlineCitationText>
            This citation has multiple sources.
          </InlineCitationText>
          <InlineCitationCard>
            <InlineCitationCardTrigger
              sources={[
                "https://example.com",
                "https://another-example.com",
                "https://third-example.com",
              ]}
            />
            <InlineCitationCardBody>
              <InlineCitationCarousel>
                <InlineCitationCarouselContent>
                  <InlineCitationCarouselItem>
                    <InlineCitationCarouselHeader>
                      <InlineCitationCarouselIndex />
                      <div className="flex gap-2">
                        <InlineCitationCarouselPrev />
                        <InlineCitationCarouselNext />
                      </div>
                    </InlineCitationCarouselHeader>
                    <InlineCitationSource
                      title="First source"
                      url="https://example.com"
                      description="This is the first source description."
                    />
                  </InlineCitationCarouselItem>
                  <InlineCitationCarouselItem>
                    <InlineCitationCarouselHeader>
                      <InlineCitationCarouselIndex />
                      <div className="flex gap-2">
                        <InlineCitationCarouselPrev />
                        <InlineCitationCarouselNext />
                      </div>
                    </InlineCitationCarouselHeader>
                    <InlineCitationSource
                      title="Second source"
                      url="https://another-example.com"
                      description="This is the second source description."
                    />
                  </InlineCitationCarouselItem>
                  <InlineCitationCarouselItem>
                    <InlineCitationCarouselHeader>
                      <InlineCitationCarouselIndex />
                      <div className="flex gap-2">
                        <InlineCitationCarouselPrev />
                        <InlineCitationCarouselNext />
                      </div>
                    </InlineCitationCarouselHeader>
                    <InlineCitationSource
                      title="Third source"
                      url="https://third-example.com"
                      description="This is the third source description."
                    />
                  </InlineCitationCarouselItem>
                </InlineCitationCarouselContent>
              </InlineCitationCarousel>
            </InlineCitationCardBody>
          </InlineCitationCard>
        </InlineCitation>
      </p>
    </div>
  ),
};

export const WithQuote: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-sm">
        <InlineCitation>
          <InlineCitationText>
            This citation includes a quote from the source.
          </InlineCitationText>
          <InlineCitationCard>
            <InlineCitationCardTrigger sources={["https://example.com"]} />
            <InlineCitationCardBody>
              <InlineCitationSource
                title="Example source"
                url="https://example.com"
                description="This is an example source description."
              />
              <InlineCitationQuote>
                &quot;This is a quoted excerpt from the source material.&quot;
              </InlineCitationQuote>
            </InlineCitationCardBody>
          </InlineCitationCard>
        </InlineCitation>
      </p>
    </div>
  ),
};

export const TextOnly: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-sm">
        <InlineCitation>
          <InlineCitationText>
            This is just citation text without a source badge.
          </InlineCitationText>
        </InlineCitation>
      </p>
    </div>
  ),
};
