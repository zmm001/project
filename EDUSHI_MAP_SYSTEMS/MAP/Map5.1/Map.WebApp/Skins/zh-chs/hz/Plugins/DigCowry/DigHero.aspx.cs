�}�� r 6  �P'g��p��a	��� ��^���}ꬉ�<����lMt���<�:-�b5iϳv�z�Ӿ.}��	�q� ���eU��	l+L�@c���}���q/����@��$�?����`+��49Y�>�0���G��V�n�����;�D��E��QC�"d1���=��d�33WZ�����7������?��<d|vI�O*�`��Ŵl�pȿ�����(��sS𚰢ׁM[X�w�vp������\E�7��E����Fj���9�x�S�<fH�#H������ ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�lD+�{�A�Ds1܁ȏ/Y8<�dʓ���!�荀i�jx���ms����"5�(�}�a��SG�]�i��Bh��=��$��]����4p�ڜ�x���0��H]K6�7����b��l�⍇��m�[3����m7��~6X$�a󡎻"���bƆA����>���ö&��3���Wg�r�-�|��Y͹��6�bK�I�~�TVB!B.li��(7#��R�2��G}E�"�&�!GY�[ Gc���.�o��\p�*�7�2�`m��<�I`�ߩ�p3�1y7��S�?BK���RJW�*�T�� ��;g�ȴ�i.�d��f�r�2��C�*�a@�mm���W�!L�!2
�{\h�u� ��f�nl���>^��k��1��y�V
l' ���{/��q���)��ɤ�<
�����U33$�ݞ����o�����/�ç���4��q�ߐm�&�t��X����;a��&54�6R֪�{2s��O��v���D�x�&G��mrCowry(this.CitySetting.ECS_DBConnectString).GetHeroList(EdushiPager.PageSize, CurrentPage, out  nRecordCount);
            EdushiPager.RecordCount = nRecordCount;
            GVHero.DataBind();
		}
        private int CurrentPage
        {
            get
            {
                return WebHelper.GetQueryString("page", 1);
            }
        }
	}
}
