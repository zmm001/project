�}U� r �  �j���Ͻ��a	��C��^���ꪉ�:��O��I9��K�RC�C��\ҥQ���~��/M/H��+<����ҭ(��9,�e.�/n_	H��9ɬ0�x�,����pn�L�L��j0y����o�ҳ5�,��.��������\QTa�<_m��1;��d�~����z7�r ǡ�O���A�U�z�y��Ny��u���6)j�%�1�\n:.����p@�H`��T
��Q��~8��xv�p���?���|߱| �\6v����i%�� d��Z�O��."�g@F�^�8�ԇ��}"��IF��cD:��t��,�������C�� ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�lD+���=�1�H�^�$8�jh����lMQ�G���3^�x&��������g@\�:�47L�Q6��4��8�ɉb���d���ݍbCV)X��h��(�0t�"٦�W[F�������u���K��:�
�;����DA3�l^�{'�1B�x���Y�s�,C��'/��3��D��Wg�r�-�|��Y͹���r���x�9�������ޮAC��(7#��R�k~��[So�4��-AH�g	���.�r��4d5�c�.p��:M���2���(5�b��S�?BK���R-i�;�W����(G����c6�+��q�u�*��Y��}�,}���e�.6Y�gvJb�a�X+� ��f�n%I⸈6���/ބd��d�FA^tω�</��_%�x���ݔ?6�����-vzU����ꯜo�����/�ç���4��q�ߐm�&�t��X����;a��&54�6R֪�{2s��O��v���D���&Gv�mring("citycode", "hz");
            string sLanguage = WebHelper.GetQueryString("l", "zh-chs");
            int iCount = WebHelper.GetQueryString("top", 6);
            MapDataProvideBLL _mapDataBLL = new MapDataProvideBLL(sCityCode, sLanguage);
            DataTable dtBdt = _mapDataBLL.GetMapHotBdtListCache(iCount);
            ResponseJson(dtBdt, "_BdtList");
            Response.End();
        }
	}
}
