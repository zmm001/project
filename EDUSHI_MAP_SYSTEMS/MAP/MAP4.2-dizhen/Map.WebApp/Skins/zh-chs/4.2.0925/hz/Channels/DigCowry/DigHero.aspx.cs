�}Y� r �  ���o�����a	���Ӟ���}��o�c��0��l��x���?e��������T����:W���>!'ޖ���Wyvz�Q�R˝�A����6��:��U��6���	�0y	�蔇C�z�U_�3M���Q�a ss�Mc�����|�aTt ��ހ�i��������o���|D�<,6���F�Rc�f>�<ߙ���V��E�҇xi҃m�?ґ m��@ڣ#u{������_�uu[�+�!���O���1�T�����#H������ ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�lD140C�A����X�G:�մil��gx["��i��p�|Ŕ#��Ced�W���x��
e�|�^9�О�}Ap��3��>D���ׯ�M��0��>�>__o�lBL��لD�X�m?��ZrY�:����� u���K���U|&�&�o8���-�-,����^)Xk���7��[�.���*��%�A�Z4��L�r����
���A��i~�ȸ,fE�Qu����#��F���lS�w�4���Qٸź��d��˹�{���/�m̥��l�?z{��_E�'%���5��j������l�������_��m��I� ���vKϳ�=���]���0=gڕ�'f������bk�v�dZf�+b��ŝu�x`�q��7�F�Af��Q��|�_�+?�!?���$��Alf�H�/Ejp/;�s�:��9F�5׎i�[�!�j�S&�ew�[�]j�Y�f]5��QDأ,� A�2^G����ݮa��@���Dk5��E����ꥅ�this.CitySetting.Language).GetHeroList(EdushiPager.PageSize,CurrentPage,out  nRecordCount);
            EdushiPager.RecordCount = nRecordCount;
            GVHero.DataBind();
		}
        private int CurrentPage
        {
            get
            {
                return Aladdin.Tools.Utility.Tools.SafeRequest("page", 1);
            }
        }
	}
}
