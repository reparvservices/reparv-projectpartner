import { useState, useEffect } from "react";
import Loader from "./Loader";
import { IoMdClose } from "react-icons/io";
import { useAuth } from "../store/auth";
import { format } from "date-fns";

const Agreement = ({ fetchAgreement, agreementData, setAgreementData }) => {
  const { user, URI, setLoading } = useAuth();
  const currentDate = format(new Date(), "do MMMM yyyy");
  const [agreementStatus, setAgreementStatus] = useState(0);

  const acceptAgreement = async (e) => {
    e.preventDefault();
    setLoading(true);

    let agreement;
    if (agreementStatus == 1) {
      agreement = "Accept";
    } else {
      agreement = "Reject";
    }

    try {
      const response = await fetch(
        `${URI}/project-partner/agreement/accept/${
          user?.id || agreementData?.id
        }`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ agreement }),
        }
      );

      if (response.status === 409) {
        alert("Agreement has already been accepted.");
        return;
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Server responded with ${response.status}: ${errorText}`
        );
      }

      alert("Agreement accepted successfully!");
      fetchAgreement(user?.id);
    } catch (err) {
      console.error("Error accepting agreement:", err);
      alert(`An error occurred while accepting the agreement: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${
        agreementData.agreement === "Reject" && agreementData.adharno
          ? "flex bg-[#767676a0]"
          : "hidden"
      } z-[61] overflow-scroll scrollbar-hide w-full h-screen fixed items-end md:items-center md:justify-center bottom-0 md:bottom-auto `}
    >
      <div className="w-full overflow-scroll scrollbar-hide md:w-[700px] lg:w-[900px] h-[90vh] md:max-h-[80vh] bg-white py-8 pb-16 px-3 sm:px-6 border border-[#cfcfcf33] rounded-tl-xl rounded-tr-xl md:rounded-lg">
        {/* Header */}

        {/* Agreement Content */}
        <div className="space-y-4 text-justify text-sm leading-relaxed">
          <p className="text-center font-bold uppercase">
            Listing Agreement (Project)
          </p>
          <p>
            This agreement of partnership is entered into and executed on this
            day {currentDate},
            <br />
            <br />
            <strong>BETWEEN</strong>
            <br />
            Reparv Services Pvt. Ltd. a company incorporated under the Companies
            Act, 2013, (hereinafter referred to as the “company”, which
            expression shall, unless it be repugnant to the context and meaning
            thereof shall mean and include its successors, assigns, and
            representatives),
            <br />
            <p>
              <strong>AND</strong>
              <br />
              <strong>{agreementData.fullname || "__________"}</strong>, (PAN{" "}
              <strong>{agreementData.panno || "__________"}</strong>), a
              resident of <strong> {agreementData.city || "________"}</strong>,
              <strong> {agreementData.state || "_________"} </strong>, having
              involved in the business of real estate development, (hereinafter
              referred to as the “Project Partner”, which expression shall,
              unless it be repugnant to the context and meaning thereof shall
              mean and include its/his/her successors, assigns, and
              representatives).
            </p>
          </p>
          <p>
            The Company and the Project Partner shall collectively be referred
            to as the “Parties” and individually as a “Party”.
          </p>

          <p>
            NOW WHEREAS, the Company is engaged in the business of providing
            comprehensive real estate solutions through digital platforms.
          </p>

          <p>
            AND WHEREAS, the Project Partner is a RERA-registered entity engaged
            in the business of real estate development / a registered company
            engaged in the business of real estate development and promotion in
            the region and is having multiple ongoing and completed properties’
            projects.
          </p>

          <p>
            AND WHEREAS, the Project Partner desires to register its properties
            with the Company and also list those properties on the website of
            the Company for the purpose of showcasing and facilitating sales to
            clients.
          </p>

          <p>
            AND WHEREAS, the Company is willing to accept such engagement with
            the Project Partner on the terms and conditions set forth herein.
          </p>

          <p>
            AND WHEREAS, the Parties intend to record the terms of their
            arrangement in writing.
          </p>

          <p>
            NOW THEREFORE, the Parties to this Covenant mutually agree on the
            following terms and conditions as stated hereunder:
          </p>

          <p className="font-semibold">1. Definitions and Interpretation</p>
          <ul className="list-disc ml-6">
            <li>
              “Act of 2016” means The Real Estate (Regulation and Development)
              Act, 2016;
            </li>
            <li>
              “Allottee” means such Client or Prospective Client who is eligible
              to be called as an allottee under section 2(d) of the Act of 2016;
            </li>
            <li>
              “Authority” means the Real Estate Regulatory Authority established
              under sub-section (1) of section 20 of the Act of 2016;
            </li>
            <li>
              “Client" means any customer of Company with whom the Project
              Partner had material contact or business dealings in the twelve
              (12) months immediately preceding the date of termination of this
              Agreement;
            </li>
            <li>
              "Conduct Rules" means the conduct rules in the clause 9 of this
              Agreement and Conduct Rules issued from time to time by the
              Company that apply or may apply to the Project Partner by virtue
              of its engagement under this Agreement;
            </li>
            <li>
              "Confidential Information" means trade secrets or information of a
              confidential nature which belongs or relates to the Company or
              their clients or customers or past or potential clients or
              customers, and which the Project Partner may have received or
              obtained or become aware of as a result of or in any way in
              connection with the engagement with Company;
            </li>
            <li>
              "Properties” means all the properties, whether separate
              units/apartments or the whole projects sites, which are
              registered/listed with the Company by the Project Partner, for
              availing the services of the Company. Such properties may be
              either owned by the Project Partner or the Project Partner may be
              authorised to develop and promote such properties by the actual
              owner of such Property. (As and where needed for referring to a
              single unit/apartment, the word “Property” is used in this
              Agreement);
            </li>
            <li>
              “Prospective Client” means any person with whom the Company shall
              have had negotiations or material discussions regarding the
              possible supply of services or distribution, sale or supply of any
              product, goods or services at any time during the twelve (12)
              months immediately preceding the date of termination of this
              Agreement and with whom you shall have had business dealings at
              any time during such period;
            </li>
            <li>
              “Sales Partner” means any or all the Sales Partners of the
              Company;
            </li>
            <li>
              “Successful Deal” means the sale of any Property of the Project
              Partner, to a Prospective Client or a Client of the Company, only
              when such Successful Deal has been facilitated by the Company
              though its agents or representatives including the Sales Partners
              and Territory Partners;
            </li>
            <li>
              "Territory Partner” means any or all the Territory Partners of the
              Company.
            </li>
          </ul>

          <p className="font-semibold">2. Purpose and Scope of Engagement</p>
          <p>
            The Project Partner hereby engages the services of the Company as an
            intermediary for the listing, display, and marketing of its
            Properties on the Company's website and associated platforms for the
            benefit of Clients and Prospective Clients. This Agreement, for the
            aforesaid purpose, acts as a parent agreement governing all the
            listings that may be done from time to time, with mutual
            understanding of the Parties.
          </p>

          <p className="font-semibold">3. Nature of Relationship</p>
          <p>
            This Agreement does not constitute a partnership under the Indian
            Partnership Act, 1932. The term “Partner” is used purely for
            representational purposes and does not confer any ownership or
            management rights in the Company. Nothing contained in this
            Agreement shall be deemed to create any relationship of partnership,
            joint venture, agency, employer-employee, franchisor-franchisee, or
            otherwise between the Parties, except as expressly provided herein.
            The Company acts merely as an intermediary to facilitate marketing
            and introduction between the Project Partner and prospective
            clients.
          </p>

          <p className="font-semibold">4. Charges</p>
          <p>
            The Project Partner shall pay to the Company, on each Successful
            Deal, certain charges which shall be determined mutually by the
            Parties as per relevant factors like price, location, demand of a
            given Property and other factors prevalent as per the market
            standards, at the time of listing of such Property on the Company’s
            website. Such agreed charges shall be displayed below every listed
            Property of the Project Partner on the digital dashboard provided by
            the Company to the Project Partner, which shall be accessible to the
            Parties only.
          </p>

          <p className="font-semibold">
            5. Accuracy of Information and Liability
          </p>
          <p>
            The Project Partner represents and warrants that all information,
            brochures, floor plans, specifications, approvals, title documents,
            and any other details provided to the Company for listing and
            marketing purposes shall be true, correct, and complete in all
            respects. In the event any information provided is found to be
            false, misleading, or inaccurate, the Project Partner shall bear
            sole responsibility and liability for all consequences, claims,
            losses, or damages arising therefrom. The Company shall not be
            liable in any manner for any disputes, claims, or litigations
            arising from such incorrect information, and shall be deemed a mere
            intermediary facilitating information sharing.
          </p>

          <p className="font-semibold">
            5A. For Projects under the ambit of RERA.
          </p>
          <p>
            The Project Partner agrees that where any of the properties of the
            Project Partner require registration with the Authority, such
            properties shall be listed only after the Project Partner supplies a
            valid copy to the Company, of such registration granted under
            section 5 of the Act of 2016. The Project Partner shall, in the
            event of revocation of such registration for a particular property,
            immediately inform the same to the Company. The Project Partner
            shall at all the times act in accordance with the provisions of laws
            applicable and strictly adhere to the provisions of the Act of 2016.
            In the event of any violation or contraventions of aforesaid, the
            Project Partner shall bear sole responsibility and liability for all
            consequences, claims, losses, or damages arising therefrom. The
            Company shall not be liable in any manner for any disputes, claims,
            or litigations arising from such incorrect information, and shall be
            deemed a mere intermediary facilitating information sharing.
          </p>

          <p className="font-semibold">6. Permission to Access Properties</p>
          <p>
            The Project Partner grants permission to the authorized agents,
            representatives, and employees of the Company to: (a) Visit the
            listed properties/projects for inspection and data verification; and
            (b) Accompany prospective clients to the properties for the purpose
            of showcasing, marketing, and sale facilitation. The Project Partner
            shall provide reasonable assistance to facilitate such visits.
          </p>

          <p className="font-semibold">7. Confedentiality</p>
          <p>
            The Project Partner agrees to maintain the confidentiality of not
            only the Confidential Information within the scope of this
            Agreement, but also all the data, information, and materials
            collected, accessed, or processed through the Company’s website or
            otherwise during the term of this Agreement. The Project Partner
            shall not, without prior written consent of the Company, use or
            disclose such information for any purpose other than as required for
            performance under this Agreement. This clause shall survive
            termination of this Agreement.
          </p>

          <p className="font-semibold">8. Non-Compete</p>
          <p>
            The Project Partner agrees that during the term of this Agreement
            and for a period of twelve (12) months following the termination
            hereof, the Project Partner shall not, directly or indirectly,
            engage in or be associated with any business that is similar to or
            competitive with the business of the Company, within India or any
            other territory where the Company operates.
          </p>

          <p className="font-semibold">9. Conduct Rules</p>
          <p>
            (a) The Project Partner shall grant permission to the Territory
            Partners and Sales Partners of the Company or any other authorized
            agents, representatives, and employees of the Company to visit the
            listed Properties for inspection and data verification and also
            accompany Clients or Prospective Clients to the properties for the
            purpose of showcasing, marketing, and sale facilitation. The Project
            Partner shall provide reasonable assistance to facilitate such
            visits. (b) The Project Partner shall deal with the Clients or
            Prospective Clients, with complete honesty and integrity, while also
            upholding the clauses of confidentiality within the scope and
            meaning of this Agreement. (c) The Project Partner agrees that it
            shall not, at any point of time during the period of this Agreement
            and Twelve (12) months after its termination, directly engage with,
            solicit, or finalize any transaction with any Client or Prospective
            Client of the Company, without the prior written consent of the
            Company, by bypassing the Company. Any engagement or transaction in
            violation of this clause shall entitle the Company to seek
            appropriate legal remedies including compensation. (d) The Project
            Partner shall not, at any point of time during the period of this
            Agreement and Twelve (12) months after its termination, try to
            directly engage the Territory Partners or Sales Partners or any
            other agents or employees of the Company for showcasing their
            Properties and further dealings, by bypassing the Company. (e) The
            Project Partner shall neither make any false promises to any person
            associated with the Company nor shall he/she indulge in any kind of
            malpractice with any person associated in any way with the Company.
            In case anything contrary to this sub-clause is brought to the
            notice of the Company, the Project Partner shall be liable to pay to
            the Company all the damages that such false promise or malpractice
            would cause. (f) The Project Partner shall, at all the times, duly
            follow the relevant laws that may be made applicable from time to
            time by the appropriate government.
          </p>

          <p className="font-semibold">10. Termination</p>
          <p>
            Notwithstanding anything contained in the Clause 17, this Agreement
            may be terminated: (a) By either Party, by giving 30 (thirty) days'
            prior written notice to the other Party; or (b) Immediately by the
            Company in the event of breach by the Project Partner of any of the
            Conduct Rules, or breach of Clause 5 or 5A or breach of any
            representation, warranty, term, or any other obligation under this
            Agreement; or (c) Upon express mutual agreement of the Parties. Upon
            termination, the Company shall remove the Project Partner's listings
            from its platform within a reasonable period.
          </p>

          <p className="font-semibold">11. Indemnity</p>
          <p>
            Notwithstanding anything contained in the Clause 17, this Agreement
            may be terminated: (a) By either Party, by giving 30 (thirty) days'
            prior written notice to the other Party; or (b) Immediately by the
            Company in the event of breach by the Project Partner of any of the
            Conduct Rules, or breach of Clause 5 or 5A or breach of any
            representation, warranty, term, or any other obligation under this
            Agreement; or (c) Upon express mutual agreement of the Parties. Upon
            termination, the Company shall remove the Project Partner's listings
            from its platform within a reasonable period.
          </p>

          <p className="font-semibold">
            12. Governing Law and Dispute Resolution
          </p>
          <p>
            This Agreement shall be governed by and construed in accordance with
            the laws of India. The Parties agree that in case of any dispute
            arising out of or in connection with this Agreement, the Parties
            shall first endeavour to resolve the dispute amicably by mutual
            co-operation. The Parties further agree that the courts in Nagpur
            shall have the exclusive territorial jurisdiction over any or all
            such disputes arising out of this Agreement.
          </p>

          <p className="font-semibold">13. Force Majeure</p>
          <p>
            Neither Party shall be held liable for failure or delay in
            performance of its obligations due to events beyond its reasonable
            control, including but not limited to acts of God, war, riots,
            governmental restrictions, natural disasters, pandemics, or power
            failures.
          </p>

          <p className="font-semibold">14. Amendment</p>
          <p>
            No amendment or modification of this Agreement shall be valid unless
            made in writing and signed by both Parties.
          </p>

          <p className="font-semibold">15. Saverability</p>
          <p>
            If any provision of this Agreement is found to be invalid or
            unenforceable, the remainder of the Agreement shall remain in full
            force and effect.
          </p>

          <p className="font-semibold">16. Notices</p>
          <p>
            All notices or communications under this Agreement shall be made
            through electronic mails, on the e-mail address(es) of the Parties
            as mentioned hereunder, or to such other address(es) as may be
            notified in writing: e-mail address of the Company –
            management@reparv.in e-mail address of the Project Partner –{" "}
            {agreementData?.email}
          </p>

          <p className="font-semibold">17. Duration</p>
          <p>
            The Duration of this Agreement shall be twelve (12) months from the
            date of entering into this Agreement. The Agreement shall
            automatically cease to exist and enforceable after the lapse of 12
            months. The Parties may however, renew the Agreement on the same
            terms and conditions or with such amendments as mutually agreed.
          </p>

          <p className="font-semibold">IN WITNESS WHEREOF</p>
          <p>
            The Parties hereto have executed this Agreement on this day{" "}
            {currentDate}.
            <br />
            <br />
            _________________ (For Reparv Services Pvt. Ltd.)
            <br />
            _________________ (For Project Partner)
          </p>
        </div>

        <form onSubmit={acceptAgreement}>
          {/* Accept Checkbox */}
          <div className="w-full flex items-start gap-2 mt-4">
            <input
              type="checkbox"
              id="agreement"
              required
              checked={agreementStatus}
              onChange={(e) => setAgreementStatus(e.target.checked)}
              className="mt-1 accent-green-600"
            />
            <label htmlFor="agreement" className="text-sm">
              I hereby agree to all the terms, conditions and clauses mentioned
              hereinabove and enter into this listing agreement at my own will.
            </label>
          </div>

          {/* Actions */}
          <div className="flex mt-8 md:mt-6 justify-end gap-6">
            <button
              type="Submit"
              className="px-4 py-2 text-white bg-[#076300] rounded active:scale-[0.98]"
            >
              Accept Agreement
            </button>
            <div>
              <Loader />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Agreement;
