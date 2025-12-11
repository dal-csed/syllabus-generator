import { type NextRequest, NextResponse } from "next/server"
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
} from "docx"

// Helper function to strip HTML tags from rich text editor content
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

export async function POST(req: NextRequest) {
  try {
    console.log("[v0] API route called")
    const data = await req.json()
    console.log("[v0] Received data keys:", Object.keys(data))

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            // Title
            new Paragraph({
              children: [
                new TextRun({
                  text: `${data.course_number || "COURSE"} --- ${data.course_name || "Course Name"}`,
                  bold: true,
                  size: 28,
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { after: 200 },
            }),
            new Paragraph({
              text: "Course Syllabus",
              heading: HeadingLevel.HEADING_1,
              alignment: AlignmentType.CENTER,
              spacing: { after: 400 },
            }),

            // 1. Instructor Information Section
            new Paragraph({
              text: "Instructor Information",
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 200, after: 200 },
            }),

            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              borders: {
                top: { style: BorderStyle.NONE, size: 0 },
                bottom: { style: BorderStyle.NONE, size: 0 },
                left: { style: BorderStyle.NONE, size: 0 },
                right: { style: BorderStyle.NONE, size: 0 },
                insideHorizontal: { style: BorderStyle.NONE, size: 0 },
                insideVertical: { style: BorderStyle.NONE, size: 0 },
              },
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph({ children: [new TextRun({ text: "Instructor:", bold: true })] })],
                      width: { size: 25, type: WidthType.PERCENTAGE },
                      borders: {
                        top: { style: BorderStyle.NONE, size: 0 },
                        bottom: { style: BorderStyle.NONE, size: 0 },
                        left: { style: BorderStyle.NONE, size: 0 },
                        right: { style: BorderStyle.NONE, size: 0 },
                      },
                    }),
                    new TableCell({
                      children: [new Paragraph(data.instructor_name || "")],
                      width: { size: 25, type: WidthType.PERCENTAGE },
                      borders: {
                        top: { style: BorderStyle.NONE, size: 0 },
                        bottom: { style: BorderStyle.NONE, size: 0 },
                        left: { style: BorderStyle.NONE, size: 0 },
                        right: { style: BorderStyle.NONE, size: 0 },
                      },
                    }),
                    new TableCell({
                      children: [new Paragraph({ children: [new TextRun({ text: "Office:", bold: true })] })],
                      width: { size: 25, type: WidthType.PERCENTAGE },
                      borders: {
                        top: { style: BorderStyle.NONE, size: 0 },
                        bottom: { style: BorderStyle.NONE, size: 0 },
                        left: { style: BorderStyle.NONE, size: 0 },
                        right: { style: BorderStyle.NONE, size: 0 },
                      },
                    }),
                    new TableCell({
                      children: [new Paragraph(data.office || "")],
                      width: { size: 25, type: WidthType.PERCENTAGE },
                      borders: {
                        top: { style: BorderStyle.NONE, size: 0 },
                        bottom: { style: BorderStyle.NONE, size: 0 },
                        left: { style: BorderStyle.NONE, size: 0 },
                        right: { style: BorderStyle.NONE, size: 0 },
                      },
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph({ children: [new TextRun({ text: "E-mail:", bold: true })] })],
                      borders: {
                        top: { style: BorderStyle.NONE, size: 0 },
                        bottom: { style: BorderStyle.NONE, size: 0 },
                        left: { style: BorderStyle.NONE, size: 0 },
                        right: { style: BorderStyle.NONE, size: 0 },
                      },
                    }),
                    new TableCell({
                      children: [new Paragraph(data.email || "")],
                      borders: {
                        top: { style: BorderStyle.NONE, size: 0 },
                        bottom: { style: BorderStyle.NONE, size: 0 },
                        left: { style: BorderStyle.NONE, size: 0 },
                        right: { style: BorderStyle.NONE, size: 0 },
                      },
                    }),
                    new TableCell({
                      children: [new Paragraph({ children: [new TextRun({ text: "Office Hours:", bold: true })] })],
                      borders: {
                        top: { style: BorderStyle.NONE, size: 0 },
                        bottom: { style: BorderStyle.NONE, size: 0 },
                        left: { style: BorderStyle.NONE, size: 0 },
                        right: { style: BorderStyle.NONE, size: 0 },
                      },
                    }),
                    new TableCell({
                      children: [new Paragraph(data.office_hours || "")],
                      borders: {
                        top: { style: BorderStyle.NONE, size: 0 },
                        bottom: { style: BorderStyle.NONE, size: 0 },
                        left: { style: BorderStyle.NONE, size: 0 },
                        right: { style: BorderStyle.NONE, size: 0 },
                      },
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({ children: [new TextRun({ text: "Class Meeting Time:", bold: true })] }),
                      ],
                      borders: {
                        top: { style: BorderStyle.NONE, size: 0 },
                        bottom: { style: BorderStyle.NONE, size: 0 },
                        left: { style: BorderStyle.NONE, size: 0 },
                        right: { style: BorderStyle.NONE, size: 0 },
                      },
                    }),
                    new TableCell({
                      children: [new Paragraph(data.class_time || "")],
                      borders: {
                        top: { style: BorderStyle.NONE, size: 0 },
                        bottom: { style: BorderStyle.NONE, size: 0 },
                        left: { style: BorderStyle.NONE, size: 0 },
                        right: { style: BorderStyle.NONE, size: 0 },
                      },
                    }),
                    new TableCell({
                      children: [new Paragraph({ children: [new TextRun({ text: "Room No:", bold: true })] })],
                      borders: {
                        top: { style: BorderStyle.NONE, size: 0 },
                        bottom: { style: BorderStyle.NONE, size: 0 },
                        left: { style: BorderStyle.NONE, size: 0 },
                        right: { style: BorderStyle.NONE, size: 0 },
                      },
                    }),
                    new TableCell({
                      children: [new Paragraph(data.classroom || "")],
                      borders: {
                        top: { style: BorderStyle.NONE, size: 0 },
                        bottom: { style: BorderStyle.NONE, size: 0 },
                        left: { style: BorderStyle.NONE, size: 0 },
                        right: { style: BorderStyle.NONE, size: 0 },
                      },
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph({ children: [new TextRun({ text: "Lab Meeting Time:", bold: true })] })],
                      borders: {
                        top: { style: BorderStyle.NONE, size: 0 },
                        bottom: { style: BorderStyle.NONE, size: 0 },
                        left: { style: BorderStyle.NONE, size: 0 },
                        right: { style: BorderStyle.NONE, size: 0 },
                      },
                    }),
                    new TableCell({
                      children: [new Paragraph(data.lab_time || "")],
                      borders: {
                        top: { style: BorderStyle.NONE, size: 0 },
                        bottom: { style: BorderStyle.NONE, size: 0 },
                        left: { style: BorderStyle.NONE, size: 0 },
                        right: { style: BorderStyle.NONE, size: 0 },
                      },
                    }),
                    new TableCell({
                      children: [new Paragraph({ children: [new TextRun({ text: "Room No:", bold: true })] })],
                      borders: {
                        top: { style: BorderStyle.NONE, size: 0 },
                        bottom: { style: BorderStyle.NONE, size: 0 },
                        left: { style: BorderStyle.NONE, size: 0 },
                        right: { style: BorderStyle.NONE, size: 0 },
                      },
                    }),
                    new TableCell({
                      children: [new Paragraph(data.lab_room || "")],
                      borders: {
                        top: { style: BorderStyle.NONE, size: 0 },
                        bottom: { style: BorderStyle.NONE, size: 0 },
                        left: { style: BorderStyle.NONE, size: 0 },
                        right: { style: BorderStyle.NONE, size: 0 },
                      },
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph({ children: [new TextRun({ text: "Course Homepage:", bold: true })] })],
                      borders: {
                        top: { style: BorderStyle.NONE, size: 0 },
                        bottom: { style: BorderStyle.NONE, size: 0 },
                        left: { style: BorderStyle.NONE, size: 0 },
                        right: { style: BorderStyle.NONE, size: 0 },
                      },
                    }),
                    new TableCell({
                      children: [new Paragraph(data.homepage || "")],
                      columnSpan: 3,
                      borders: {
                        top: { style: BorderStyle.NONE, size: 0 },
                        bottom: { style: BorderStyle.NONE, size: 0 },
                        left: { style: BorderStyle.NONE, size: 0 },
                        right: { style: BorderStyle.NONE, size: 0 },
                      },
                    }),
                  ],
                }),
              ],
            }),

            new Paragraph({ text: "", spacing: { after: 200 } }),

            // Teaching Assistants
            ...(data.tas && data.tas.length > 0
              ? [
                  new Paragraph({
                    children: [
                      new TextRun({ text: "Teaching Assistants: ", bold: true }),
                      new TextRun(data.tas.map((ta: any) => `${ta.name} (${ta.email})`).join(", ")),
                    ],
                    spacing: { after: 200 },
                  }),
                ]
              : []),

            // Course Mail List
            ...(data.course_mail_list
              ? [
                  new Paragraph({
                    children: [
                      new TextRun({ text: "Course Mail List: ", bold: true }),
                      new TextRun(data.course_mail_list),
                    ],
                    spacing: { after: 400 },
                  }),
                ]
              : []),

            ...(data.important_dates
              ? [
                  new Paragraph({
                    text: "Important Dates",
                    heading: HeadingLevel.HEADING_2,
                    spacing: { before: 200, after: 200 },
                  }),
                  new Paragraph({
                    text: stripHtml(data.important_dates),
                    spacing: { after: 400 },
                  }),
                ]
              : []),

            // 3. Course Description
            ...(data.course_description
              ? [
                  new Paragraph({
                    text: "Course Description",
                    heading: HeadingLevel.HEADING_2,
                    spacing: { before: 200, after: 200 },
                  }),
                  new Paragraph({
                    text: data.course_description,
                    spacing: { after: 400 },
                  }),
                ]
              : []),

            ...(data.learning_outcomes
              ? [
                  new Paragraph({
                    text: "Learning Outcomes",
                    heading: HeadingLevel.HEADING_2,
                    spacing: { before: 200, after: 200 },
                  }),
                  new Paragraph({
                    text: stripHtml(data.learning_outcomes),
                    spacing: { after: 400 },
                  }),
                ]
              : []),

            // 5. Course Rationale
            ...(data.course_rationale
              ? [
                  new Paragraph({
                    text: "Course Rationale",
                    heading: HeadingLevel.HEADING_2,
                    spacing: { before: 200, after: 200 },
                  }),
                  new Paragraph({
                    text: data.course_rationale,
                    spacing: { after: 400 },
                  }),
                ]
              : []),

            ...(data.class_format
              ? [
                  new Paragraph({
                    text: "Class Format and Course Communication",
                    heading: HeadingLevel.HEADING_2,
                    spacing: { before: 200, after: 200 },
                  }),
                  new Paragraph({
                    text: stripHtml(data.class_format),
                    spacing: { after: 400 },
                  }),
                ]
              : []),

            ...(data.evaluation_criteria && data.evaluation_criteria.length > 0
              ? [
                  new Paragraph({
                    text: "Evaluation Criteria",
                    heading: HeadingLevel.HEADING_2,
                    spacing: { before: 200, after: 200 },
                  }),
                  ...data.evaluation_criteria.flatMap((item: any) => [
                    new Paragraph({
                      children: [new TextRun({ text: `${item.name}: `, bold: true }), new TextRun(item.percentage)],
                      spacing: { after: 50 },
                    }),
                    ...(item.description
                      ? [
                          new Paragraph({
                            text: item.description,
                            spacing: { after: 150, left: 400 },
                          }),
                        ]
                      : []),
                  ]),
                  new Paragraph({ text: "", spacing: { after: 300 } }),
                ]
              : []),

            ...(data.notes
              ? [
                  new Paragraph({
                    text: "Notes",
                    heading: HeadingLevel.HEADING_2,
                    spacing: { before: 200, after: 200 },
                  }),
                  new Paragraph({
                    text: stripHtml(data.notes),
                    spacing: { after: 400 },
                  }),
                ]
              : []),

            // 9. Student Declaration of Absence
            ...(data.student_declaration
              ? [
                  new Paragraph({
                    text: "Student Declaration of Absence",
                    heading: HeadingLevel.HEADING_2,
                    spacing: { before: 200, after: 200 },
                  }),
                  new Paragraph({
                    text: data.student_declaration,
                    spacing: { after: 400 },
                  }),
                ]
              : []),

            ...(data.exam_requirements
              ? [
                  new Paragraph({
                    text: "Midterm and Final Exam Requirements",
                    heading: HeadingLevel.HEADING_2,
                    spacing: { before: 200, after: 200 },
                  }),
                  new Paragraph({
                    text: stripHtml(data.exam_requirements),
                    spacing: { after: 400 },
                  }),
                ]
              : []),

            ...(data.academic_standards
              ? [
                  new Paragraph({
                    text: "Academic Standards",
                    heading: HeadingLevel.HEADING_2,
                    spacing: { before: 200, after: 200 },
                  }),
                  new Paragraph({
                    text: stripHtml(data.academic_standards),
                    spacing: { after: 400 },
                  }),
                ]
              : []),

            ...(data.required_texts
              ? [
                  new Paragraph({
                    text: "Required Texts and Resources",
                    heading: HeadingLevel.HEADING_2,
                    spacing: { before: 200, after: 200 },
                  }),
                  new Paragraph({
                    text: stripHtml(data.required_texts),
                    spacing: { after: 400 },
                  }),
                ]
              : []),

            // 13. Prerequisites
            ...(data.prerequisites
              ? [
                  new Paragraph({
                    text: "Prerequisites",
                    heading: HeadingLevel.HEADING_2,
                    spacing: { before: 200, after: 200 },
                  }),
                  new Paragraph({
                    text: data.prerequisites,
                    spacing: { after: 400 },
                  }),
                ]
              : []),

            ...(data.topics_list
              ? [
                  new Paragraph({
                    text: "Tentative List of Topics",
                    heading: HeadingLevel.HEADING_2,
                    spacing: { before: 200, after: 200 },
                  }),
                  new Paragraph({
                    text: stripHtml(data.topics_list),
                    spacing: { after: 400 },
                  }),
                ]
              : []),

            ...(data.assignments && data.assignments.length > 0
              ? [
                  new Paragraph({
                    text: "Assignments",
                    heading: HeadingLevel.HEADING_2,
                    spacing: { before: 200, after: 200 },
                  }),
                  ...data.assignments.flatMap((assignment: any) => [
                    new Paragraph({
                      children: [
                        new TextRun({ text: `${assignment.title}`, bold: true }),
                        new TextRun(` - Due: ${assignment.date}`),
                      ],
                      spacing: { after: 50 },
                    }),
                    ...(assignment.description
                      ? [
                          new Paragraph({
                            text: assignment.description,
                            spacing: { after: 150, left: 400 },
                          }),
                        ]
                      : []),
                  ]),
                  new Paragraph({ text: "", spacing: { after: 300 } }),
                ]
              : []),

            // Standard footer sections (not editable) would go here
          ],
        },
      ],
    })

    console.log("[v0] Document created successfully")

    const buffer = await Packer.toBuffer(doc)
    console.log("[v0] Buffer generated, size:", buffer.length)

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${data.course_number || "course"}-syllabus.docx"`,
      },
    })
  } catch (error: any) {
    console.error("[v0] Error in API route:", error)
    console.error("[v0] Error stack:", error.stack)
    return NextResponse.json(
      {
        error: error.message || "Internal server error",
        details: error.stack,
      },
      { status: 500 },
    )
  }
}
