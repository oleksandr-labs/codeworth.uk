import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS } from "@/lib/data/portfolio";
import { MathUpDemo } from "@/components/portfolio/demos/MathUpDemo";
import { MelodyDemo } from "@/components/portfolio/demos/MelodyDemo";
import { DevStartDemo } from "@/components/portfolio/demos/DevStartDemo";
import { SpeakEasyDemo } from "@/components/portfolio/demos/SpeakEasyDemo";
import { AgroUADemo } from "@/components/portfolio/demos/AgroUADemo";
import { AgroDroneDemo } from "@/components/portfolio/demos/AgroDroneDemo";
import { OrganicBoxDemo } from "@/components/portfolio/demos/OrganicBoxDemo";
import { VynohradDemo } from "@/components/portfolio/demos/VynohradDemo";
import { PasikaDemo } from "@/components/portfolio/demos/PasikaDemo";
import { ModaUADemo } from "@/components/portfolio/demos/ModaUADemo";
import { SportPeakDemo } from "@/components/portfolio/demos/SportPeakDemo";
import { ToyLandDemo } from "@/components/portfolio/demos/ToyLandDemo";
import { NoirDemo } from "@/components/portfolio/demos/NoirDemo";
import { LumiereDemo } from "@/components/portfolio/demos/LumiereDemo";
import { FitZoneDemo } from "@/components/portfolio/demos/FitZoneDemo";
import { BrewCoDemo } from "@/components/portfolio/demos/BrewCoDemo";
import { SweetLabDemo } from "@/components/portfolio/demos/SweetLabDemo";
import { WanderUADemo } from "@/components/portfolio/demos/WanderUADemo";
import { EstateUADemo } from "@/components/portfolio/demos/EstateUADemo";
import { DentaLuxDemo } from "@/components/portfolio/demos/DentaLuxDemo";
import { AutoProDemo } from "@/components/portfolio/demos/AutoProDemo";
import { LordCutDemo } from "@/components/portfolio/demos/LordCutDemo";
import { VirtualZoneDemo } from "@/components/portfolio/demos/VirtualZoneDemo";
import { BudProDemo } from "@/components/portfolio/demos/BudProDemo";
import { GreenLeafDemo } from "@/components/portfolio/demos/GreenLeafDemo";
import { LexUADemo } from "@/components/portfolio/demos/LexUADemo";
import { PetCareDemo } from "@/components/portfolio/demos/PetCareDemo";
import { BloomDemo } from "@/components/portfolio/demos/BloomDemo";
import { EventMasterDemo } from "@/components/portfolio/demos/EventMasterDemo";
import { LaserTagDemo } from "@/components/portfolio/demos/LaserTagDemo";
import { QuickBiteDemo } from "@/components/portfolio/demos/QuickBiteDemo";
import { CalmMindDemo } from "@/components/portfolio/demos/CalmMindDemo";
import { SupportAIDemo } from "@/components/portfolio/demos/SupportAIDemo";
import { CarpathiaStayDemo } from "@/components/portfolio/demos/CarpathiaStayDemo";
import { FotoValentynaDemo } from "@/components/portfolio/demos/FotoValentynaDemo";
import { CleanProDemo } from "@/components/portfolio/demos/CleanProDemo";
import { DobroUADemo } from "@/components/portfolio/demos/DobroUADemo";
import { HandMadeUADemo } from "@/components/portfolio/demos/HandMadeUADemo";
import { ArkhytektonDemo } from "@/components/portfolio/demos/ArkhytektonDemo";
import { FormaStudioDemo } from "@/components/portfolio/demos/FormaStudioDemo";
import { SmachnoDemo } from "@/components/portfolio/demos/SmachnoDemo";
import { BeautyRoomDemo } from "@/components/portfolio/demos/BeautyRoomDemo";
import { MedCenterDemo } from "@/components/portfolio/demos/MedCenterDemo";
import { FitLifeDemo } from "@/components/portfolio/demos/FitLifeDemo";
import { SweetBakeryDemo } from "@/components/portfolio/demos/SweetBakeryDemo";
import { LexProDemo } from "@/components/portfolio/demos/LexProDemo";
import { BudProConstructDemo } from "@/components/portfolio/demos/BudProConstructDemo";
import { HomeFindDemo } from "@/components/portfolio/demos/HomeFindDemo";
import { SkillUpDemo } from "@/components/portfolio/demos/SkillUpDemo";
import { MasterPlusDemo } from "@/components/portfolio/demos/MasterPlusDemo";
import { WowEventDemo } from "@/components/portfolio/demos/WowEventDemo";
import { LapkaVetDemo } from "@/components/portfolio/demos/LapkaVetDemo";
import { GoodFoodDemo } from "@/components/portfolio/demos/GoodFoodDemo";
import { BloomShopDemo } from "@/components/portfolio/demos/BloomShopDemo";
import { PsychOlenaDemo } from "@/components/portfolio/demos/PsychOlenaDemo";
import { ProCourseDemo } from "@/components/portfolio/demos/ProCourseDemo";
import { CoachAndriyDemo } from "@/components/portfolio/demos/CoachAndriyDemo";
import { SmileProDemo } from "@/components/portfolio/demos/SmileProDemo";
import { FarmaPlusDemo } from "@/components/portfolio/demos/FarmaPlusDemo";
import { InvoiceFlowDemo } from "@/components/portfolio/demos/InvoiceFlowDemo";
import { SwiftCargoDemo } from "@/components/portfolio/demos/SwiftCargoDemo";
import { InkSoulDemo } from "@/components/portfolio/demos/InkSoulDemo";
import { HammamDemo } from "@/components/portfolio/demos/HammamDemo";
import { TalentHubDemo } from "@/components/portfolio/demos/TalentHubDemo";
import { StrategyCODemo } from "@/components/portfolio/demos/StrategyCODemo";
import { TechStoreDemo } from "@/components/portfolio/demos/TechStoreDemo";
import { AtelierModaDemo } from "@/components/portfolio/demos/AtelierModaDemo";
import { ArtPlayDemo } from "@/components/portfolio/demos/ArtPlayDemo";
import { ModernHomeDemo } from "@/components/portfolio/demos/ModernHomeDemo";
import { CarBuyDemo } from "@/components/portfolio/demos/CarBuyDemo";
import { AutoDetailDemo } from "@/components/portfolio/demos/AutoDetailDemo";
import { PinkyPopDemo } from "@/components/portfolio/demos/PinkyPopDemo";
import { DustZeroDemo } from "@/components/portfolio/demos/DustZeroDemo";
import { OfficeCleanDemo } from "@/components/portfolio/demos/OfficeCleanDemo";
import { EspressoBarDemo } from "@/components/portfolio/demos/EspressoBarDemo";
import { ZenTeaDemo } from "@/components/portfolio/demos/ZenTeaDemo";
import { DigitalShiftDemo } from "@/components/portfolio/demos/DigitalShiftDemo";
import { LegalTechDemo } from "@/components/portfolio/demos/LegalTechDemo";
import { CeramicaDemo } from "@/components/portfolio/demos/CeramicaDemo";
import { LeatherSmithDemo } from "@/components/portfolio/demos/LeatherSmithDemo";
import { RepairProDemo } from "@/components/portfolio/demos/RepairProDemo";
import { SmartHomeDemo } from "@/components/portfolio/demos/SmartHomeDemo";
import { FunZoneDemo } from "@/components/portfolio/demos/FunZoneDemo";
import { BeatWaveDemo } from "@/components/portfolio/demos/BeatWaveDemo";
import { ConfHubDemo } from "@/components/portfolio/demos/ConfHubDemo";
import { MaisonDariaDemo } from "@/components/portfolio/demos/MaisonDariaDemo";
import { VintageLoftDemo } from "@/components/portfolio/demos/VintageLoftDemo";
import { ZenFlowDemo } from "@/components/portfolio/demos/ZenFlowDemo";
import { BotanicaDemo } from "@/components/portfolio/demos/BotanicaDemo";
import { KidJoyDemo } from "@/components/portfolio/demos/KidJoyDemo";
import { RoboTechDemo } from "@/components/portfolio/demos/RoboTechDemo";
import { FamilyGuardDemo } from "@/components/portfolio/demos/FamilyGuardDemo";
import { IPShieldDemo } from "@/components/portfolio/demos/IPShieldDemo";
import { LaBoulangerieDemo } from "@/components/portfolio/demos/LaBoulangerieDemo";
import { PretzelFarmDemo } from "@/components/portfolio/demos/PretzelFarmDemo";
import { CodeKidsDemo } from "@/components/portfolio/demos/CodeKidsDemo";
import { LingoSphereDemo } from "@/components/portfolio/demos/LingoSphereDemo";
import { EduProDemo } from "@/components/portfolio/demos/EduProDemo";
import { WildFieldDemo } from "@/components/portfolio/demos/WildFieldDemo";
import { GreenPlateDemo } from "@/components/portfolio/demos/GreenPlateDemo";
import { OfficeLunchDemo } from "@/components/portfolio/demos/OfficeLunchDemo";
import { StoreRoomDemo } from "@/components/portfolio/demos/StoreRoomDemo";
import { SwiftMileDemo } from "@/components/portfolio/demos/SwiftMileDemo";
import { NovitaDemo } from "@/components/portfolio/demos/NovitaDemo";
import { PawFundDemo } from "@/components/portfolio/demos/PawFundDemo";
import { HopeUADemo } from "@/components/portfolio/demos/HopeUADemo";
import { RebuildUADemo } from "@/components/portfolio/demos/RebuildUADemo";
import { AptekaDemo } from "@/components/portfolio/demos/AptekaDemo";
import { NaturoDemo } from "@/components/portfolio/demos/NaturoDemo";
import { PharmaGoDemo } from "@/components/portfolio/demos/PharmaGoDemo";
import { LensLightDemo } from "@/components/portfolio/demos/LensLightDemo";
import { LittleMomentsDemo } from "@/components/portfolio/demos/LittleMomentsDemo";
import { StudioShootDemo } from "@/components/portfolio/demos/StudioShootDemo";
import { CoupleSpaceDemo } from "@/components/portfolio/demos/CoupleSpaceDemo";
import { MindSpaceDemo } from "@/components/portfolio/demos/MindSpaceDemo";
import { LaCasaDemo } from "@/components/portfolio/demos/LaCasaDemo";
import { UrbanParkDemo } from "@/components/portfolio/demos/UrbanParkDemo";
import { DevHuntDemo } from "@/components/portfolio/demos/DevHuntDemo";
import { StaffProDemo } from "@/components/portfolio/demos/StaffProDemo";
import { HRPulseDemo } from "@/components/portfolio/demos/HRPulseDemo";
import { TaskFlowDemo } from "@/components/portfolio/demos/TaskFlowDemo";
import { PiercePointDemo } from "@/components/portfolio/demos/PiercePointDemo";
import { AzureWindDemo } from "@/components/portfolio/demos/AzureWindDemo";
import { BedHopperDemo } from "@/components/portfolio/demos/BedHopperDemo";
import { PetSaversDemo } from "@/components/portfolio/demos/PetSaversDemo";
import { ZooLifeDemo } from "@/components/portfolio/demos/ZooLifeDemo";
import { MaxPowerDemo } from "@/components/portfolio/demos/MaxPowerDemo";
import { WinTechDemo } from "@/components/portfolio/demos/WinTechDemo";
import { KitchenLabDemo } from "@/components/portfolio/demos/KitchenLabDemo";
import { SmartKidsDemo } from "@/components/portfolio/demos/SmartKidsDemo";
import { FinAdvisorsDemo } from "@/components/portfolio/demos/FinAdvisorsDemo";
import { GlowBarDemo } from "@/components/portfolio/demos/GlowBarDemo";
import { InkCityDemo } from "@/components/portfolio/demos/InkCityDemo";
import { AquaZenDemo } from "@/components/portfolio/demos/AquaZenDemo";
import { BridalLuxDemo } from "@/components/portfolio/demos/BridalLuxDemo";
import { ExecuteSearchDemo } from "@/components/portfolio/demos/ExecuteSearchDemo";
import { SparkWashDemo } from "@/components/portfolio/demos/SparkWashDemo";
import { BoxClubDemo } from "@/components/portfolio/demos/BoxClubDemo";
import { DigitalFirstBankDemo } from "@/components/portfolio/demos/DigitalFirstBankDemo";
import { UrbanDeskDemo } from "@/components/portfolio/demos/UrbanDeskDemo";
import { EscapeQuestDemo } from "@/components/portfolio/demos/EscapeQuestDemo";
import { VinoCaveDemo } from "@/components/portfolio/demos/VinoCaveDemo";
import { TalentScanDemo } from "@/components/portfolio/demos/TalentScanDemo";
import { PriceSenseDemo } from "@/components/portfolio/demos/PriceSenseDemo";
import { DocSenseDemo } from "@/components/portfolio/demos/DocSenseDemo";
import { MachineGuardDemo } from "@/components/portfolio/demos/MachineGuardDemo";
import { VisualFindDemo } from "@/components/portfolio/demos/VisualFindDemo";
import { WholesaleHubDemo } from "@/components/portfolio/demos/WholesaleHubDemo";
import { ChainOpsDemo } from "@/components/portfolio/demos/ChainOpsDemo";
import { BuildTrackDemo } from "@/components/portfolio/demos/BuildTrackDemo";
import { RetailCoreDemo } from "@/components/portfolio/demos/RetailCoreDemo";
import { AgencyDeskDemo } from "@/components/portfolio/demos/AgencyDeskDemo";
import { CareHubDemo } from "@/components/portfolio/demos/CareHubDemo";
import { FleetDeskDemo } from "@/components/portfolio/demos/FleetDeskDemo";
import { DemoBanner } from "@/components/portfolio/demos/DemoBanner";

interface Props {
  params: Promise<{ lang: string; slug: string }>;
}

/** Map portfolio slug → demo component */
const DEMOS: Record<string, React.ComponentType<{ lang: string }>> = {
  "math-school-online": MathUpDemo,
  "music-school-melody": MelodyDemo,
  "coding-bootcamp-devstart": DevStartDemo,
  "language-school-speakeasy": SpeakEasyDemo,
  "agroua-farm": AgroUADemo,
  "agrodrone-tech": AgroDroneDemo,
  "organicbox-csa": OrganicBoxDemo,
  "vynohrad-winery": VynohradDemo,
  "pasika-honey": PasikaDemo,
  "fashion-store": ModaUADemo,
  "sportpeak-equipment": SportPeakDemo,
  "toyland-kids": ToyLandDemo,
  "fine-dining": NoirDemo,
  "beauty-studio": LumiereDemo,
  "fitness-gym": FitZoneDemo,
  "coffee-bar": BrewCoDemo,
  "pastry-shop": SweetLabDemo,
  "travel-agency": WanderUADemo,
  "estate-agency": EstateUADemo,
  "dental-studio": DentaLuxDemo,
  "autopro-service": AutoProDemo,
  "barber-lordcut": LordCutDemo,
  "vr-zone": VirtualZoneDemo,
  "budpro-builders": BudProDemo,
  "greenleaf-cafe": GreenLeafDemo,
  "lexua-law": LexUADemo,
  "petcare-vet": PetCareDemo,
  "bloom-flowers": BloomDemo,
  "eventmaster-agency": EventMasterDemo,
  "lasertag-arena": LaserTagDemo,
  "quickbite-delivery": QuickBiteDemo,
  "calmmind-therapy": CalmMindDemo,
  "ai-chatbot-saas": SupportAIDemo,
  "travel-hotel": CarpathiaStayDemo,
  "photographer-portfolio": FotoValentynaDemo,
  "cleaning-service": CleanProDemo,
  "ngo-charity-landing": DobroUADemo,
  "craft-workshop-landing": HandMadeUADemo,
  "architecture-studio": ArkhytektonDemo,
  "interior-design-studio": FormaStudioDemo,
  "restaurant-cafe": SmachnoDemo,
  "beauty-salon": BeautyRoomDemo,
  "medical-clinic": MedCenterDemo,
  "fitness-club": FitLifeDemo,
  "bakery": SweetBakeryDemo,
  "law-firm": LexProDemo,
  "construction": BudProConstructDemo,
  "real-estate-agency": HomeFindDemo,
  "education-platform": SkillUpDemo,
  "auto-service": MasterPlusDemo,
  "events-agency": WowEventDemo,
  "veterinary-clinic": LapkaVetDemo,
  "food-delivery-app": GoodFoodDemo,
  "flower-shop": BloomShopDemo,
  "psychology-coach": PsychOlenaDemo,
  "professional-courses-portal": ProCourseDemo,
  "personal-trainer-landing": CoachAndriyDemo,
  "dental-clinic-landing": SmileProDemo,
  "pharmacy-online-landing": FarmaPlusDemo,
  "saas-product-landing": InvoiceFlowDemo,
  "logistics-b2b-landing": SwiftCargoDemo,
  "tattoo-spa": InkSoulDemo,
  "hammam-turkish-spa": HammamDemo,
  "recruitment-platform": TalentHubDemo,
  "business-consulting": StrategyCODemo,
  "electronics-store": TechStoreDemo,
  "bespoke-tailoring-atelier": AtelierModaDemo,
  "art-creativity-kids": ArtPlayDemo,
  "furniture-store": ModernHomeDemo,
  "used-car-marketplace": CarBuyDemo,
  "car-detailing-wrap": AutoDetailDemo,
  "nail-art-studio": PinkyPopDemo,
  "post-construction-cleaning": DustZeroDemo,
  "commercial-cleaning": OfficeCleanDemo,
  "mobile-coffee-truck": EspressoBarDemo,
  "specialty-teahouse": ZenTeaDemo,
  "digital-transformation-consulting": DigitalShiftDemo,
  "legaltech-consulting": LegalTechDemo,
  "ceramics-studio-shop": CeramicaDemo,
  "leather-goods-workshop": LeatherSmithDemo,
  "repair-service": RepairProDemo,
  "smarthome-store": SmartHomeDemo,
  "entertainment-center": FunZoneDemo,
  "festival-ticketing": BeatWaveDemo,
  "conference-platform": ConfHubDemo,
  "fashion-brand": MaisonDariaDemo,
  "vintage-thrift-shop": VintageLoftDemo,
  "yoga-studio": ZenFlowDemo,
  "premium-floral-design": BotanicaDemo,
  "kids-center": KidJoyDemo,
  "stem-robotics-kids": RoboTechDemo,
  "family-law": FamilyGuardDemo,
  "ip-law": IPShieldDemo,
  "bakery-pastry": LaBoulangerieDemo,
  "artisan-bread-bakery": PretzelFarmDemo,
  "kids-coding-school": CodeKidsDemo,
  "language-school": LingoSphereDemo,
  "online-education": EduProDemo,
  "wildflower-eco-shop": WildFieldDemo,
  "meal-prep-service": GreenPlateDemo,
  "corporate-lunch": OfficeLunchDemo,
  "warehouse-rental": StoreRoomDemo,
  "last-mile-courier": SwiftMileDemo,
  "fertility-center": NovitaDemo,
  "animal-rescue-fund": PawFundDemo,
  "ngo-foundation": HopeUADemo,
  "war-reconstruction-ngo": RebuildUADemo,
  "online-pharmacy": AptekaDemo,
  "herbal-natural-pharmacy": NaturoDemo,
  "pharmacy-express-delivery": PharmaGoDemo,
  "photography-studio": LensLightDemo,
  "newborn-photography": LittleMomentsDemo,
  "commercial-photography": StudioShootDemo,
  "couples-counseling": CoupleSpaceDemo,
  "psychology-platform": MindSpaceDemo,
  "villa-rental": LaCasaDemo,
  "residential-complex": UrbanParkDemo,
  "it-headhunter": DevHuntDemo,
  "general-staffing-agency": StaffProDemo,
  "hr-payroll-saas": HRPulseDemo,
  "project-management-saas": TaskFlowDemo,
  "piercing-body-art-studio": PiercePointDemo,
  "yacht-charter": AzureWindDemo,
  "hostel-booking": BedHopperDemo,
  "emergency-vet-clinic": PetSaversDemo,
  "petshop-vet-combo": ZooLifeDemo,
  "personal-trainer": MaxPowerDemo,
  "window-manufacturer": WinTechDemo,
  "luxury-kitchen-studio": KitchenLabDemo,
  "smart-kids-development": SmartKidsDemo,
  "financial-advisory": FinAdvisorsDemo,
  "glowbar-beauty": GlowBarDemo,
  "ink-city-tattoo": InkCityDemo,
  "aqua-zen-spa": AquaZenDemo,
  "bridal-luxury-salon": BridalLuxDemo,
  "executive-hunt": ExecuteSearchDemo,
  "carwash-premium": SparkWashDemo,
  "subscription-box-monthly": BoxClubDemo,
  "fintech-neobank": DigitalFirstBankDemo,
  "coworking-urban": UrbanDeskDemo,
  "escape-quest-arena": EscapeQuestDemo,
  "wine-cave-bar": VinoCaveDemo,
  "ai-resume-screener": TalentScanDemo,
  "ai-price-optimizer": PriceSenseDemo,
  "ai-doc-analyzer": DocSenseDemo,
  "ai-predictive-maintenance": MachineGuardDemo,
  "ai-image-search": VisualFindDemo,
  "erp-wholesale": WholesaleHubDemo,
  "erp-restaurant-chain": ChainOpsDemo,
  "erp-construction": BuildTrackDemo,
  "erp-retail-chain": RetailCoreDemo,
  "erp-agency": AgencyDeskDemo,
  "erp-clinic": CareHubDemo,
  "erp-logistics": FleetDeskDemo,
};

export async function generateStaticParams() {
  return Object.keys(DEMOS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project || !DEMOS[slug]) return {};
  const isUk = lang === "uk";
  return {
    title: isUk
      ? `${project.title} — Демо сайту | Портфоліо Codeworth`
      : `${project.title} — Live Demo | Codeworth Portfolio`,
    description: isUk
      ? `Демонстрація готового сайту: ${project.description}`
      : `Live demo website: ${project.description}`,
    robots: { index: false },
  };
}

export default async function PortfolioDemoPage({ params }: Props) {
  const { lang, slug } = await params;
  const DemoComponent = DEMOS[slug];
  if (!DemoComponent) notFound();

  return (
    <>
      <DemoComponent lang={lang} />
      <DemoBanner lang={lang} slug={slug} />
    </>
  );
}
